'use strict';

const Boom = require('boom');
const User = require('../model/User');
const bcrypt = require('bcrypt');

function verifyCredentials(req, res) {

  const password = req.payload.password;

  User.findOne({
    email: req.payload.email
  }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          res(user);
        }
        else {
          res(Boom.badRequest('Incorrect password!'));
        }
      });
    } else {
      res(Boom.badRequest('Incorrect email!'));
    }
  });
}

module.exports = {
  verifyCredentials: verifyCredentials
}
