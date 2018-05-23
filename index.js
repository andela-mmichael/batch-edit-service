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
  res.send(200, "You're running the Batch Edit Service");
});


/**
 *
 * Example:
 *
 *    POST /batch/:id?
 *
 *  where id refer
 *
 * Request:  {
 *  "url": "https://virtserver.swaggerhub.com/Guesty/Users/1.0.0/user",
 *  "verb": "PUT",
 *  "payload": [{
    *  "id": "ja2S-hs81-ksn3-iQI9",
    *  "body": { "age": 30 },
    * }
    *  {
    *  "id": "ja2S-hs81-ksn3-iQI9",
    *  "body": {"age": 30 }
    *  },
    *  {
    *    "id": "ja2S-hs81-ksn3-iQI9",
    *    "body": {"age": 30 }
    *  }
 *  ]
 * }



 *
 * Response:
 *
 *   Returns a result request
 *
 *
 * @param req - HTTP request object
 * @param res - HTTP response object
 */

app.post('/batch/:id?', function (req, res) {
  let result = [];
  let data = req.body.payload || req.params.id;

  data.forEach(async(element) => {
    const requestOptions = {
      url: `${req.body.url}/${element.id}`,
      type: req.body.verb
    };
    let message = await updateUser(requestOptions, element);
    result.push({ id: element.id, status: message });
  });

  res.json({ result });

});


function updateUser(options, payload) {
  return new Promise((resolve, reject) =>  {
    unirest.put(options.url)
      .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
      .send(payload.body)
      .end(function (response) {
        resolve(response.body);
      })
  });
}


/**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
  console.log('Batch Edit Service is running on port %s.', app.get('port'));
});

module.exports = app;
