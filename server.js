'use strict';

const database = require('./src/utils/database');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_PORT = process.env.NODE_PORT || 3000;

console.log(`Using Environment ${process.env.NODE_ENV}`);

database
  .connect()
  .then(() => {
    const app = require('./app');    
    
    app.listen(process.env.NODE_PORT, (error) => {
      if (error) return Promise.reject(error);
    });
  })
  .catch(error => console.log(error, error.stack));
