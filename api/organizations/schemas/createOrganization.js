'use strict';

const Joi = require('joi');

const createOrganizationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string().required(),
  code: Joi.string().required(),
  orgType: Joi.string().required()
});

module.exports = createOrganizationSchema;
