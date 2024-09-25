// src/index.js
const { addNumbers } = require('./math');

// Get command-line arguments
const args = process.argv.slice(2); // The first two arguments are node path and the script path, so we ignore them

if (args.length !== 2) {
  console.error('Please provide exactly two numbers as arguments.');
  process.exit(1); // Exit with an error code
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

if (isNaN(num1) || isNaN(num2)) {
  console.error('Both arguments must be valid numbers.');
  process.exit(1); // Exit with an error code
}

const sum = addNumbers(num1, num2);

console.log(`The sum of ${num1} and ${num2} is ${sum}`);
