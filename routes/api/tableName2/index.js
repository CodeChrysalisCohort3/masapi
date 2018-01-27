const express = require('express');

const router = express.Router();

module.exports = (services) => {
  // Is serialize function necessary?
  router.post('', (req, res) => services.db.tableName2.create({ name: req.body.name })
    .then(tableName2 => res.status(201).json(tableName2.serialize()))
    .catch(err => res.status(400).send(err.message)));
  
  router.get('', (req, res) => services.db.tableName2.list()
    .then(tableName2 => tableName2.map(tableName2 => tableName2.serialize()))
    .then(tableName2 => res.status(200).json(tableName2))
    .catch(err => res.status(400).send(err.message)));

  return router;
}