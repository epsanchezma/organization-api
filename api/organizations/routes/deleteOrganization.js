'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');
const deleteOrganizationSchema = require('../schemas/deleteOrganization');

module.exports = {
  method: 'DELETE',
  path: '/api/organizations/{id}',
  config: {
    handler: (req, res) => {
      const id = req.params.id;
      Organization
        .findOneAndRemove({ _id: id }, (err, organization) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!organization) {
            throw Boom.notFound('Organization not found!');
          }
          res({statusCode: 200, message: 'Organization deleted!'});
        });      
    },
    validate: {
      params: deleteOrganizationSchema.paramsSchema
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  } 
}
