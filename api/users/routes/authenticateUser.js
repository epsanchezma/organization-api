'use strict';

const Boom = require('boom');
const User = require('../model/User');
const verifyCredentials = require('../util/userFunctions').verifyCredentials;
const createToken = require('../util/token');

module.exports = {
  method: 'POST',
  path: '/api/users/authenticate',
  config: {
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      res({ id_token: createToken(req.pre.user) }).code(201);
    }
  }
}
