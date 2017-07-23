'use strict';

const services = require('../services/tshirt.service');

const create = (req, res, next) => {
  const body = req.body;

  services.createOne(body)
    .then((body) => res.status(201).json(body))
    .catch(next);
};

const findAll = (req, res, next) => {
  services.findAll({})
    .then(body => res.status(200).json(body))
    .catch(next);
};

module.exports = {
  create,
  findAll
};