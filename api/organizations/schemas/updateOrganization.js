'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const payloadSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  url: Joi.string(),
  code: Joi.string(),
  orgType: Joi.string()
});

const paramsSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = {
  payloadSchema: payloadSchema,
  paramsSchema: paramsSchema
}
