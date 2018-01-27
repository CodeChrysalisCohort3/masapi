const config = require('../config');
const knex = require('knex')(config.db);
const Promise = require('bluebird');

const ignoreError = (err) => {
  // do nothing becase this is the error of tests.
};

const clearTable = tableName => knex(tableName).del().catch(ignoreError);

const tables = ['coffeeBeans', 'countries'];

Promise.all(tables.map(clearTable))
  .then(process.exit);
  