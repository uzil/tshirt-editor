'use strict';

const Joi = require('joi');

const schema = {};

// schema for create action
schema.create = {};

// schema to validate body of request
schema.create.body = {
  title: Joi.string().required(),
  colorCode: Joi.string().required(),
  email: Joi.string().required(),
  canvasJSON: Joi.object().required(),
  createdAt: Joi.string(),
  apparelId: Joi.string().required()
};

// schema for find all method 
schema.findAll = {};

// schema to validate query of request
schema.findAll.query = {
  email: Joi.string().required(),
};


module.exports = schema;
