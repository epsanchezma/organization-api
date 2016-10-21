'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');
const queryOrganizationSchema = require('../schemas/getOrganization');

const organizationQuery = function(req, res, filters){
  Organization
    .findOne({_id: req.params.id})
    .select(filters)
    .exec((err, organization) => {
      if (organization) {
        res(organization).code(200);;
      } else {
        res({status_code: 404, message: "No organization found"}).code(404);
      }
      if (err) {
        throw Boom.badRequest(err);
      }
    });
};

module.exports = {
  method: 'GET',
  path: '/api/organizations/{id}',
  config: {
    handler: (req, res) => {
      organizationQuery(req, res, '-code -__v -url');
    },
    validate: {
      query: queryOrganizationSchema.querySchema
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
}
