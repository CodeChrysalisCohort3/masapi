const express = require('express');

const router = express.Router();

const tableName1Router = require('./tableName1');
const tableName2Router = require('./tableName2');

module.exports = (services) => {
  router.use('/tableName1', tableName1Router(services));
  router.use('/tableName2', tableName2Router(services));

  return router;
};
