'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');

module.exports = {
  method: 'PATCH',
  path: '/api/organizations/{id}',
  config: {
    handler: (req, res) => {
      const id = req.params.id;
      Organization
        .findOneAndUpdate({ _id: id }, req.pre.organization, (err, organization) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!organization) {
            throw Boom.notFound('Organization not found!');
          }
          res(organization);
        });      
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
  
}
