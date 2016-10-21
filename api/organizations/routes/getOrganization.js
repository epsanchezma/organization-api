'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');
const queryOrganizationSchema = require('../schemas/getOrganization');

const organizationQuery = function(req, res, filters){
  Organization
    .find(req.query)
    .select(filters)
    .exec((err, organizations) => {
      if (err) {
        throw Boom.badRequest(err);
      }
      res({organizations: organizations}).code(200);;
    });
};

module.exports = {
  method: 'GET',
  path: '/api/organizations',
  config: {
    handler: (req, res) => {
      if (req.query.code) {
        organizationQuery(req, res, '-__v -url');
      } else {
        organizationQuery(req, res, '-code -__v -url');
      }
    },
    validate: {
      query: queryOrganizationSchema.querySchema
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
}
