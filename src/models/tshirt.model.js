'use strict';

const db = require('../utils/database').getInstance();

const resourceName = 'tshirt';
const model = db.collection(resourceName);

module.exports = model;
