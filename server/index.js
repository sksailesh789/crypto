/*******************************************************
 *      Server Starts From Here                        *
 *******************************************************/
'use strict';
require('dotenv').config();
const http = require('http');
const app = require('./app');
const port =  5300;
const env =  'Development';
const app_name =  'Crypto';
const server = http.createServer(app);

app.set('PORT_NUMBER', port);

//  Start the app on the specific interface (and port).
server.listen(port, () => {
  console.log(`|  ${app_name} started with ${env} Environment on port ${port} at Date ${new Date()}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
