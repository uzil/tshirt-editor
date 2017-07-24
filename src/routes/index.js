'use strict';

const glob = require('glob');
const path = require('path');

// add all the routes to express object

module.exports = (app) => {
  // grab every file with pattern *.routes.js
  glob.sync('./**/*.routes.js')
    .forEach((file) => {
      app.use('/', require(path.resolve(file)));
    });
};