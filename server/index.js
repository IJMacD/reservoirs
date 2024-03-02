var express = require('express');
var path = require('path');

const PORT = process.env.PORT || 3001;

var app = express();

var indexPath = path.join(__dirname, './dist/index.html');

app.get('/', function (request, response) {
  response.sendFile(indexPath);
});

app.use(express.static(path.join(__dirname, './dist')));

app.get('/reservoirs.json', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");

  const Reservoirs = require('./Reservoirs');

  Reservoirs.checkReservoirs().then(function (reservoirs) {

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