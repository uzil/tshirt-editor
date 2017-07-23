'use strict';

const config = require('config');
const router = require('express').Router();
const controller = require('../controller/tshirt.controller');

const apiPrefix = config.get('apiPrefix');

router.get(apiPrefix + '/tshirts', controller.findAll);
router.post(apiPrefix + '/tshirts', controller.create);

module.exports = router;