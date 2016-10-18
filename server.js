'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config');

const server = new Hapi.Server();

server.connection({ port: 3000 });

//const dbUrl = 'mongodb://localhost/test';

// server.register(require('hapi-auth-jwt'), (err) => {

//   // We're giving the strategy both a name
//   // and scheme of 'jwt'
//   server.auth.strategy('jwt', 'jwt', {
//     key: secret,
//     verifyOptions: { algorithms: ['HS256'] }
//   });

//   glob.sync('api/**/routes/*.js', {
//     root: __dirname
//   }).forEach(file => {
//     const route = require(path.join(__dirname, file));
//     server.route(route);
//   });
// });

// Start the server

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
      reply('Hello, world!');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at: ${server.info.uri}');
  //Once started, connect to Mongo through Mongoose
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('we are connected!');
  });

});
