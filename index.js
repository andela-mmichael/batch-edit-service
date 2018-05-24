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
  res.send("You're running the Batch Edit Service");
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

app.post('/batch/:id?', async function (req, res) {
  let data = req.body.payload || req.params.id.split(',');

  const requestPromise = () => data.map((item) => {
    const requestOptions = {
      url: `${req.body.url}/${item}`,
      method: req.body.verb,
      body: req.body.data,
      id: item
    };
    return updateUser(requestOptions);
  });

  let results = await batchProcess(requestPromise);

  res.json(results);
});

function updateUser(options) {
  return new Promise((resolve, reject) =>  {
    unirest(options.method, options.url)
      .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
      .send(options.body)
      .end(function (response) {
        if (response.statusCode === 200) {
          resolve({
            id: options.id,
            success: true
          });
        }

        // retry call
        if (response.statusCode === 503) {
          // updateUser(options, payload)
          resolve({
            id: options.id,
            success: false
          });
        }

        // wait and  retry
        // if (response.statusCode === 429) {

        // }

      })
  });
}

async function batchProcess(requestPromise) {
  return Promise.all(requestPromise())
    .then((body) => body)
    .catch((err) => console.error(err));

}


/**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
  console.log('Batch Edit Service is running on port %s.', app.get('port'));
});

module.exports = app;
