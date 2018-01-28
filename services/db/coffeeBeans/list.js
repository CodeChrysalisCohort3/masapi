module.exports = (knex, CoffeeBean) => () => {
  const coffeeBeansPromise = knex('coffeeBeans')
    .select()
    .then((coffeeBeans) => coffeeBeans.map(coffeeBean => new CoffeeBean(coffeeBean)));
  
  return Promise.resolve(coffeeBeansPromise);
};
