'use strict';

const services = require('../services/canvas.service');

const create = (req, res, next) => {
  const body = req.body;

  services.createOne(body)
    .then((body) => res.status(201).json(body))
    .catch(next);
};

// find all canvas by email
const findAll = (req, res, next) => {
  const email = req.query.email;
  const conditions = { email }
  
  services.findAll(conditions)
    .then(body => res.status(200).json(body))
    .catch(next);
};

module.exports = {
  create,
  findAll
};