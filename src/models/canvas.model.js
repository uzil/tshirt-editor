'use strict';

const db = require('../utils/database').getInstance();

const resourceName = 'canvas';
const model = db.collection(resourceName);

module.exports = model;
