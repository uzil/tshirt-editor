'use strict';

const glob = require('glob');
const path = require('path');

module.exports = (app) => {
  glob.sync('./**/*.routes.js')
    .forEach((file) => {
      app.use('/', require(path.resolve(file)));
    });
};