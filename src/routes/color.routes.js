'use strict';

const config = require('config');
const router = require('express').Router();
const controller = require('../controller/color.controller');

const apiPrefix = config.get('apiPrefix');

router.get(apiPrefix + '/colors', controller.getAsArray);
router.post(apiPrefix + '/colors', controller.create);

module.exports = router;
