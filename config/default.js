'use strict';

/**
 * default config, it is loaded and available in every
 * node environment
 */

const index = {
  unique: {
    unique: true,
    background: true,
    dropDups: true,
    w: 1
  }
};

module.exports = {
  dbOptions: { index },
  apiPrefix: '/api'
};
