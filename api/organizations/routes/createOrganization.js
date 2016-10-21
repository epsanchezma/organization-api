'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');
const createOrganizationSchema = require('../schemas/createOrganization');

module.exports = {
  method: 'POST',
  path: '/api/organizations',
  config: {
    handler: (req, res) => {
      let organization = new Organization();
      organization.name = req.payload.name;
      organization.description = req.payload.description;
      organization.url = req.payload.url;
      organization.code = req.payload.code;
      organization.orgType = req.payload.orgType;

      organization.save((err, organization) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        res(organization).code(201);
      });
    },
    validate: {
      payload: createOrganizationSchema
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
}
