'use strict';

const config = require('config');
const router = require('express').Router();
const controller = require('../controller/canvas.controller');

const apiPrefix = config.get('apiPrefix');

router.get(apiPrefix + '/canvases', controller.findAll);
router.post(apiPrefix + '/canvases', controller.create);

module.exports = router;
