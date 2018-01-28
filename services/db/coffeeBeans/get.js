module.exports = (knex, CoffeeBean) => {
  return (params) => {
    const coffeeBeanName = params.coffeeBeanName;

    return knex('coffeeBeans')
      .where({ coffeeBeanName: coffeeBeanName.toLowerCase() })
      .select()
      .then((coffeeBeans) => {
        if (coffeeBeans.length) return new CoffeeBean(coffeeBeans.pop());

        throw new Error(`Error finding coffee bean ${coffeeBeanName}`);
      });
  };
};
