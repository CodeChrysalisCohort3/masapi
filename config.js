module.exports = {
  db: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'masapi',
    },
    port: 5432,
  },

  express: {
    port: 3000,
  },

  logger: {
    format: 'dddd MMMM Do YYYY, h:mm:ss: a',
  },
};