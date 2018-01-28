const express = require('express');

const router = express.Router();

const coffeeBeansRouter = require('./coffeeBeans');

module.exports = (services) => {
  router.use('/coffeeBeans', coffeeBeansRouter(services));

  return router;
};
