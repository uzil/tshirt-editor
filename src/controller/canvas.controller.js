'use strict';
const ObjectID = require('mongodb').ObjectID;
const services = require('../services/canvas.service');
const tshirtServices = require('../services/tshirt.service');

const isValidApparel = Promise.coroutine(function *(apparelID) {
  const apparel = yield tshirtServices.findOne({
    _id: new ObjectID(apparelID)
  });

  if (!apparel || !Object.keys(apparel).length) {
    const error = new Error('No such apparel found');
    error.status = 404;
    return error;
  }

  return apparel;
});

const create = (req, res, next) => {
  const body = req.body;

  isValidApparel(body.apparelId)
    .then(() => services.createOne(body))
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