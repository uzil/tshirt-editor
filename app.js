'use strict';

require('./bootstrap');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const angularStartPoint = __dirname + '../public/index.html'
  res.status(200).sendFile(path.join(angularStartPoint));
});

require('./src/routes/index')(app);

app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(error.status || error.statusCode || 400).json(error);
});

module.exports = app;