'use strict';

const config = require('config');
const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;

const mongoInfo = config.get('MONGO');
const mongoConfig = { native_parser: true, promiseLibrary: Promise };
const mongoUrl = `mongodb://${mongoInfo.HOST}:${mongoInfo.PORT}/${mongoInfo.dbName}`;

function Connection() {
  this.connected = false;
}

Connection.prototype.connect = Promise.coroutine(function *() {
  if (this.connected) return this.db;

  this.db = yield MongoClient.connect(mongoUrl, mongoConfig);
  this.connected = true;

  return this.db;
});

Connection.prototype.getInstance = function() {
  if (!this.db) {
    const error = 'DB connection not initialised, call connect first';
    throw new Error(error);
  }

  return this.db;
};

module.exports = new Connection();
