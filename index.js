const config = require('./config.js');

const services = require('./services')(config);

// Use the result of line 3
const apiRouter = require('./routes/api')(services);

const morgan = require('morgan');

const bodyParser = require('body-parser');

const express = require('express');

const app = express();

// In development environment, show logging
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  next();
});

app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }));

app.use('/api', apiRouter);
app.use(express.static(`${__dirname}/public`));

// Catch Error. Errors seemes to be put into stack
// if error is caused by JSON, 400
app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match('node_module/body-parser')) return res.status(400).send('Invalid JSON');
  }

  services.logger.log(err);
  return res.status(500).send('Internal Error.');
});

app.listen(config.express.port, () => {
  services.logger.log(`Server up and listening on port ${config.express.port}`);
});