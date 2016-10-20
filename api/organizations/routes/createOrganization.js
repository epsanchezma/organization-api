'use strict';

const Boom = require('boom');
const Organization = require('../model/Organization');
const createOrganizationSchema = require('../schemas/createOrganization');

module.exports = {
  method: 'POST',
  path: '/api/organizations',
  config: {
    handler: (req, res) => {
      console.log("entering create organization");
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
        res({ organization: organization }).code(201);
      });
    },
    validate: {
      payload: createOrganizationSchema
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
}
