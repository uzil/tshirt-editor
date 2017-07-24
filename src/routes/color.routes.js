'use strict';

const config = require('config');
const validate = require('cartilage');
const router = require('express').Router();
const controller = require('../controller/color.controller');
const schema = require('../validations/color.validation');

const apiPrefix = config.get('apiPrefix');

router.get(apiPrefix + '/colors', controller.getAsArray);

router.post(
  apiPrefix + '/colors',
  validate(schema.create),
  controller.create
);

module.exports = router;
