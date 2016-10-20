'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const querySchema = Joi.object({
  name: Joi.string().optional(),
  code: Joi.string().optional()
});


module.exports = {
  querySchema: querySchema
}
