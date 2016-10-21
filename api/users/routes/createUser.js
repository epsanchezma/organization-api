'use strict';

const bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../model/User');
const createToken = require('../util/token');

function hashPassword(password, cb) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

module.exports = {
  method: 'POST',
  path: '/api/users',
  handler: (req, res) => {

    let user = new User();
    user.email = req.payload.email;
    user.admin = true;

    hashPassword(req.payload.password, (err, hash) => {
      if (err) {
        throw Boom.badRequest(err);
      }
      user.password = hash;
      user.save((err, user) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        res({ id_token: createToken(user) }).code(201);
      });
    });
  }
}
