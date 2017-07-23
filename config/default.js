'use strict';

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
