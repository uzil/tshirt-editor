'use strict';

const Promise = require('bluebird');
const database = require('../src/utils/database');

const tshirtSeedData = require('./tshirt.seed.json');
const colorSeedData = require('./color.seed.json');


database.connect()
  .then(() => {
    const tshirtModel = require('../src/models/tshirt.model');
    const colorModel = require('../src/models/color.model');

    Promise.all([
      tshirtModel.insert(tshirtSeedData, { w:1 }),
      colorModel.insert(colorSeedData, { w:1 }),
    ])
    .then(() => {
      console.log('Data added successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.log('Error Occured: ', error);
    })
  });