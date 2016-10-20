'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationModel = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  code: { type: String, required: true },
  orgType: { type: String, required: true }
});

module.exports = mongoose.model('Organization', organizationModel);
