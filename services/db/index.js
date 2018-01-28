const Knex = require('knex');

module.exports = (config) => {
  const knex = Knex({
    client: config.client,
    port: config.port,
    connection: {
      host: config.connection.port,
      database: config.connection.database,
    },
  });

  return {
    coffeeBeans: require('./coffeeBeans')(knex),
  };
};
