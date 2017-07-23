'use strict';

const db = require('../utils/database').getInstance();

const resourceName = 'color';
const model = db.collection(resourceName);

module.exports = model;
