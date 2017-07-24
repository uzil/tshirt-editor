'use strict';
const services = require('../services/color.service');

const create = (req, res, next) => {
  const body = req.body;

  services.createOne(body)
    .then((body) => res.status(201).json(body))
    .catch(next);
};

// get arrays of only color id
const getAsArray = (req, res, next) => {
  services.findAll({})
    .then(colors => res.status(200).json(colors.map(color => color.code)))
    .catch(next);
};

module.exports = {
  create,
  getAsArray
};