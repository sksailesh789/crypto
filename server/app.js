'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hpp = require('hpp');
const httpStatus = require('http-status');
const cors = require("cors");

const mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI : require('./config/keys').mongoURI;

const routes = require('./routes/index');
const otherHelper = require('./helper/others.helper');

const app = express();

// Body parser middleware

// create application/json parser
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
// create application/x-www-form-urlencoded parser
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  }),
);
app.use(cors());

// protect against HTTP Parameter Pollution attacks
app.use(hpp());



// DB Config
mongoose.Promise = global.Promise;

let defaults = {};
Promise.resolve(app)
  .then(MongoDBConnection)
  .catch((err) => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`));

// Database Connection
async function MongoDBConnection(app) {
  // console.log(`| MongoDB URL  : ${mongoURI}`);
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('| MongoDB Connected');
      console.log('|--------------------------------------------');
    });

  return app;
}


// CORS setup for dev
app.use(function (req, res, next) {
  // req.client_ip_address = requestIp.getClientIp(req);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
  next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/private', express.static(path.join(__dirname, 'private')));
// Use Routes
app.use('/api', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, err, 'Route Not Found', null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, null, err, null, null);
  }
});

module.exports = app;
