var express = require('express');
var path = require('path')

module.exports = {
  app: function () {
    var app = express();

    var indexPath = path.join(__dirname, '/../src/index.html');

    if(process.env.NODE_ENV != "production") {
      indexPath = path.join(__dirname, '/../index.html');
    }

    app.get('/', function(request, response) {
      response.sendFile(indexPath);
    });

    app.use(express.static(path.join(__dirname, '/../public')));

    app.get('/reservoirs.json', function(req, res) {

      const Reservoirs = require('./Reservoirs');

      Reservoirs.checkReservoirs().then(function (reservoirs){

        var result = {
          reservoirs
        };

        res.send(JSON.stringify(result));
      }).catch(function (error) {
        console.error(error);
        res.send(JSON.stringify({error: error}));
      });

    });

    return app;
  }
}
