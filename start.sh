#!/bin/sh
# Start rsyslog
rsyslogd

# Start your app with PM2
pm2-runtime start dist/index.js --merge-logs --log-type syslog
