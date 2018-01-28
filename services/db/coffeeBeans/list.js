module.exports = (knex, CoffeeBean) => () => {
  const coffeeBeansPromise = knex('coffee_beans')
    .select()
    .then((coffeeBeans) => coffeeBeans.map(coffeeBean => new CoffeeBean(coffeeBean)));
  
  return Promise.resolve(coffeeBeansPromise);
};
