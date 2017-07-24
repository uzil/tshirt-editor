'use strict';

const ObjectID = require('mongodb').ObjectID;
const services = require('../services/tshirt.service');

const create = (req, res, next) => {
  const body = req.body;

  services.createOne(body)
    .then((body) => res.status(201).json(body))
    .catch(next);
};

const findOne = (req, res, next) => {
  const conditions = {
    _id: new ObjectID(req.params.tshirtId)
  };

  services.findOne(conditions)
    .then(tshirt => res.status(200).json(tshirt))
    .catch(next);
};

const findAll = (req, res, next) => {
  services.findAll({})
    .then(body => res.status(200).json(body))
    .catch(next);
};

module.exports = {
  create,
  findAll,
  findOne
};