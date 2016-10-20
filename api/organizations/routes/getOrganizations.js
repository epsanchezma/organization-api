'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');

module.exports = {
  method: 'GET',
  path: '/api/organizations',
  config: {
    handler: (req, res) => {
      Organization
        .find()
        .exec((err, organizations) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!organizations.length) {
            throw Boom.notFound('No organizations found!');
          }
          res(organizations);
        });
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
}
