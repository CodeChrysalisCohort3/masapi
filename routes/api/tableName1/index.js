const express = require('express');

const router = express.Router();

module.exports = (services) => {
  // Is serialize function necessary?
  router.post('', (req, res) => services.db.tableName1.create({ name: req.body.name })
    .then(tableName1 => res.status(201).json(tableName1.serialize()))
    .catch(err => res.status(400).send(err.message)));
  
  router.get('', (req, res) => services.db.tableName1.list()
    .then(tableName1 => tableName1.map(tableName1 => tableName1.serialize()))
    .then(tableName1 => res.status(200).json(tableName1))
    .catch(err => res.status(400).send(err.message)));

  return router;
}