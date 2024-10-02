// src/index.js
const http = require('http');
const url = require('url');
const { addNumbers } = require('./math');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/add' && req.method === 'GET') {
    const { num1, num2 } = query;

    if (!num1 || !num2) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Please provide two numbers as query parameters: num1 and num2');
      return;
    }

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);

    if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Both query parameters must be valid numbers.');
      return;
    }

    try {
      const sum = addNumbers(parsedNum1, parsedNum2);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`The sum of ${parsedNum1} and ${parsedNum2} is ${sum}`);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('An error occurred while processing your request.');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

function createServer() {
  return server;
}

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

module.exports = { createServer };