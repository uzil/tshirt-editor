'use strict';

// This file for starting the application server

const database = require('./src/utils/database');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_PORT = process.env.PORT || 3000;

console.log(`Using Environment ${process.env.NODE_ENV}`);

// connect to the database
database
  .connect()
  .then(() => {
    const app = require('./app');    
    
    // start the server
    app.listen(process.env.NODE_PORT, (error) => {
      if (error) return Promise.reject(error);
    });
  })
  .catch(error => console.log(error, error.stack));
