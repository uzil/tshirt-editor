'use strict';

const config = require('config');
const validate = require('cartilage');
const router = require('express').Router();
const controller = require('../controller/tshirt.controller');
const schema = require('../validations/tshirt.validation');

const apiPrefix = config.get('apiPrefix');

router.get(apiPrefix + '/tshirts', controller.findAll);

router.get(apiPrefix + '/tshirts/:tshirtId', controller.findOne);

router.post(
  apiPrefix + '/tshirts',
  validate(schema.create),
  controller.create
);

module.exports = router;