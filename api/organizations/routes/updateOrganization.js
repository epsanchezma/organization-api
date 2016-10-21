'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');
const updateOrganizationSchema = require('../schemas/updateOrganization');

module.exports = {
  method: 'PATCH',
  path: '/api/organizations/{id}',
  config: {
    handler: (req, res) => {
      const id = req.params.id;
      Organization
        .findOneAndUpdate({ _id: id }, req.payload, (err, organization) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!organization) {
            throw Boom.notFound('Organization not found!');
          }
          res().code(204);
        });      
    },
    validate: {
      payload: updateOrganizationSchema.payloadSchema,
      params: updateOrganizationSchema.paramsSchema
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  } 
}
