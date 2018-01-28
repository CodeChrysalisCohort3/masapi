module.exports = (knex, CoffeeBean) => {
  return (params) => {
    const coffeeBeanName = params.coffeeBeanName;

    return knex('coffee_beans')
      .where({ coffee_bean_name: coffeeBeanName.toLowerCase() })
      .select()
      .then((coffeeBeans) => {
        if (coffeeBeans.length) return new CoffeeBean(coffeeBeans.pop());

        throw new Error(`Error finding coffee bean ${coffeeBeanName}`);
      });
  };
};
