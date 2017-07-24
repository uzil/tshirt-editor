'use strict';

/**
 * This file houses function related
 * establishing a connection to db, retaining it
 * and on demand getting it as an instance
 */

const config = require('config');
const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;

const mongoInfo = config.get('MONGO');
const mongoConfig = { native_parser: true, promiseLibrary: Promise };
const mongoUrl = `mongodb://${mongoInfo.HOST}:${mongoInfo.PORT}/${mongoInfo.dbName}`;

// initialisation if function constructor
function Connection() {
  // by default set connetcted status as false
  this.connected = false;
}

// connect to db and return a db instance
Connection.prototype.connect = Promise.coroutine(function *() {
  if (this.connected) return this.db;

  this.db = yield MongoClient.connect(mongoUrl, mongoConfig);
  this.connected = true;

  return this.db;
});

// get the instance of db object
Connection.prototype.getInstance = function() {
  // only return db instance if it is there
  if (!this.db) {
    const error = 'DB connection not initialised, call connect first';
    throw new Error(error);
  }

  return this.db;
};

module.exports = new Connection();
