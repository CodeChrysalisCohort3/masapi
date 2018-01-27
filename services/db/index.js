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

  // write table name as object key name and
  // value is 'require('./TABLENAME')(knex)
  return {

  };
};
// Is knexfile.js necessary?