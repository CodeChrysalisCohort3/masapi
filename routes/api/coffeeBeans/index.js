const express = require('express');

const router = express.Router();

module.exports = (services) => {
  // Is serialize function necessary?
  router.post('', (req, res) => services.db.coffeeBeans.create({
    coffeeBeanName: req.body.coffeeBeanName,
    country: req.body.country,
  })
    .then(coffeeBeansData => res.status(201).json(coffeeBeansData.serialize()))
    .catch(err => res.status(400).send(err.message)));

  router.get('', (req, res) => services.db.coffeeBeans.list()
    // list function should return the instances of CoffeeBean class, not row data from database
    .then(coffeeBeansData => coffeeBeansData.map(eachBeanData => eachBeanData.serialize()))
    .then(serializedBeans => res.status(200).json(serializedBeans))
    .catch(err => res.status(400).send(err.message)));

  return router;
};
