'use strict';

const Joi = require('joi');

const schema = {};

// schema for create action
schema.create = {};

// schema to validate body of request
schema.create.body = {
  name: Joi.string().required(),
  img: Joi.string().required()
};

module.exports = schema;
