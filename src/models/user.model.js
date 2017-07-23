'use strict';

const config = require('config');
const db = require('../utils/database').getInstance();

const resourceName = 'user';
const model = db.collection(resourceName);

model.ensureIndex({ username: 1 }, config.dbOptions.index.unique);
model.ensureIndex({ email: 1 }, config.dbOptions.index.unique);

module.exports = model;
