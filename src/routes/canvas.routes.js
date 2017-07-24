'use strict';

const config = require('config');
const validate = require('cartilage');
const router = require('express').Router();
const controller = require('../controller/canvas.controller');
const schema = require('../validations/canvas.validation');

const apiPrefix = config.get('apiPrefix');

router.get(
  apiPrefix + '/canvases',
  validate(schema.findAll),
  controller.findAll
);

router.post(
  apiPrefix + '/canvases',
  validate(schema.create),
  controller.create
);

module.exports = router;
