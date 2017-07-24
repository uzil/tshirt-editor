'use strict';

// This file is db interface for controller

const model = require('../models/tshirt.model');

// create new single record
const createOne = values => model.insertOne(values, { w: 1 });

// find every record meeting certain condition
const findAll = conditions => model.find(conditions).toArray();

// find exactly one record
const findOne = conditions => model.findOne(conditions);

module.exports = {
  createOne,
  findAll,
  findOne
}
