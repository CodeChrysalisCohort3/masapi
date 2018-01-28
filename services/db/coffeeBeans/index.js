const moment = require('moment');

class CoffeeBean {
  constructor(dbCoffeeBean) {
    this.id = dbCoffeeBean.id;
    this.coffeeBeanName = dbCoffeeBean.coffeeBeanName;
    this.country = dbCoffeeBean.country;
    this.importAt = new Date(dbCoffeeBean.import_at);
  }

  serialize() {
    return {
      id: this.id,
      coffeeBeanName: this.coffeeBeanName,
      importAt: moment(this.importAt).format('YYYY-MM-DD'),
    };
  }
}

module.exports = (knex) => {
  return {
    create: require('./create')(knex, CoffeeBean),
    list: require('./list')(knex, CoffeeBean),
    get: require('./get')(knex, CoffeeBean),
  };
};
