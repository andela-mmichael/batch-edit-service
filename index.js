/**
 * Main App Entry Point.
 */

/**
 * Module dependencies.
 */

const express = require('express');
const bodyParser = require('body-parser');

/**
 * Create Express Server.
 */

const app = express();

/**
 * Express configuration.
 */

app.set('port', 5555);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
  console.log('Batch Edit Service is running on port %s.', app.get('port'));
});

module.exports = app;
