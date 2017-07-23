'use strict';

const model = require('../models/canvas.model');

const createOne = values => model.insertOne(values, { w: 1 });
const findAll = conditions => model.find(conditions).toArray();

module.exports = {
  createOne,
  findAll
};
