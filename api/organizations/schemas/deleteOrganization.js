'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const paramsSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = {
  paramsSchema: paramsSchema
}
