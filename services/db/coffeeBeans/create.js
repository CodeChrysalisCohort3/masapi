// check the validity of the name before creating the data in the database
const validateCoffeeBeansName = (cbName) => typeof cbName === 'string' &&
  cbName.replace(' ', '').length > 2;

  const Promise = require('bluebird');

  module.exports = (knex, CoffeeBean) => {
    return (params) => {
      const coffeeBeanName = params.coffeeBeanName;
      const country = params.country;

      return Promise.try(() => {
        if (!validateCoffeeBeansName(coffeeBeanName)) throw new Error('A name of coffee bean must be provided, and be at least two characters');
        if (!validateCoffeeBeansName(country)) throw new Error('A name of country must be provided, and be at least two characters');
      })
      .then(() => knex('coffee_beans').insert({
        coffee_bean_name: coffeeBeanName.toLowerCase(),
        country: country.toLowerCase(),
      }))
      .then(() => {
        return knex('coffee_beans')
          .where({ coffee_bean_name: coffeeBeanName.toLowerCase() })
          .select();
      })
      .then((coffeeBeanArray) => new CoffeeBean(coffeeBeanArray.pop()))
      .catch((err) => {
        if (err.message.match('duplicate key value')) throw new Error('That coffee bean has already existed');
        throw err;
      });
    };
  };
  