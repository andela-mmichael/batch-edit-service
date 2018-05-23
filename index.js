/**
 * Main App Entry Point.
 */

/**
 * Module dependencies.
 */

const express = require('express');
const bodyParser = require('body-parser');
const unirest = require('unirest');

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


app.get('/', function (req, res) {
  res.send(200, 'App is running well');
});

app.post('/batch', function (req, res) {
  res.json({ message: 'We got here' });
});


/**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
  console.log('Batch Edit Service is running on port %s.', app.get('port'));
});

module.exports = app;
