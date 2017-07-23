'use strict';

module.exports = {
  MONGO: {
    HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.MONGO_PORT || 27017,
    dbName: process.env.MONGO_DB_NAME || 'tshirtApp'
  }
};