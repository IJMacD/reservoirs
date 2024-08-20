import express from 'express';
import path from 'path';
import * as ReservoirDB from './ReservoirDB.js';

const PORT = process.env.PORT || 3001;

var app = express();

// const __dirname = import.meta.dirname;
const __dirname = new URL('.', import.meta.url).pathname;

var indexPath = path.join(__dirname, './dist/index.html');

app.get('/', function (request, response) {
  response.sendFile(indexPath);
});

app.use(express.static(path.join(__dirname, './dist')));

app.get('/reservoirs.json', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");

  ReservoirDB.getReservoirs().then(function (reservoirs) {

    var result = {
      reservoirs
    };

    res.send(JSON.stringify(result));
  }).catch(function (error) {
    console.error(error);
    res.send(JSON.stringify({ error: error }));
  });

});

app.listen(PORT);
console.log("Listening on port %d", PORT);