'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const config = require('./config');
const env = process.env.NODE_ENV || "development";
const port = parseInt(process.env.PORT) || 3000;

const server = new Hapi.Server();

const dbUrl = config.dbUrl[env];

server.connection({ port: port });

server.register(require('hapi-auth-jwt'), (err) => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.key,
    verifyOptions: { algorithms: ['HS256'] }
  });

  glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
      reply('This is a Pager project!');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  mongoose.connect(dbUrl, {}, (err) => {
    if (err) {
      throw err;
    }
  });

});

module.exports = server;
