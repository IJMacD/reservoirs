var cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path')

var pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  app: function () {
    var app = express();

    app.use(express.static(path.join(__dirname, 'public')));

    // views is directory for all template files
    // app.set('views', __dirname + '/views');
    // app.set('view engine', 'ejs');

    app.get('/', function(request, response) {
      // response.render('pages/index');
      response.sendFile(path.join(__dirname, 'index.html'));
    });

    app.get('/cool', function(request, response) {
      response.send(cool());
    });

    app.get('/times', function(request, response) {
        var result = ''
        var times = process.env.TIMES || 5
        for (i=0; i < times; i++)
          result += i + ' ';
      response.send(result);
    });

    app.get('/db', function (request, response) {
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
          done();
          if (err)
          { console.error(err); response.send("Error " + err); }
          else
          { response.render('pages/db', {results: result.rows} ); }
        });
      });
    });

    var Promise = require('promise');
    var request = require('request');
    var cheerio = require('cheerio');

    app.get('/reservoirs.json', function(req, res) {
      var url = "http://www.wsd.gov.hk/en/publications_and_statistics/statistics/current_storage_position_of_reservoirs/";
      var sql = "SELECT id,name,image FROM reservoirs";

      Promise.all([
        fetch(url).then(scrapeHTML),
        query(sql)
      ]).then(function(results){
        var fetchData = results[0];
        var dbData = results[1];

        var reservoirs = fetchData.map(function (reservoir) {
          // O(n^2) but for very small n
          var dbReservoir = findReservoir(dbData, reservoir.name) || {};

          return {
            id: dbReservoir.id,
            name: reservoir.name,
            capacity: reservoir.capacity,
            utilisation: reservoir.utilisation,
            image: dbReservoir.image
          }
        });

        var result = {
          reservoirs: reservoirs
        };

        updateDatabase(reservoirs);

        res.send(JSON.stringify(result));
      }).catch(function (error) {
        console.error(error);
        res.send(JSON.stringify({error: error}));
      });

    });

    return app;
  }
}

function fetch(url) {
  var request = require('request');

  return new Promise(function(resolve, reject){
    request(url, function(error, response, html) {
      if(error) {
        reject(error);
      }
      resolve(html);
    });
  });
}

function query(sql, params) {

  return new Promise(function(resolve, reject){
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) { console.error(err); reject(err); }
      else {
        client.query(sql, params, function(err, result) {
          done();
          if (err)
          { console.error(err); reject(err); }
          else
          { resolve(result.rows); }
        });
      }
    });
  });
}

function scrapeHTML (html) {
  var cheerio = require('cheerio');

  var $ = cheerio.load(html);

  var table = $('.tableframe').get(1);

  var reservoirs = [];

  if(table) {
    $(table).find('.tabletext').each(function () {
      var cells = $(this).find('td'),
          name = $(cells[0]).text(),
          capacity = parseFloat($(cells[1]).text()) * 1e6,
          utilisation = parseFloat($(cells[2]).text()) / 100;

      // Exclude total row
      if(name.indexOf("TOTAL") == -1){

        reservoirs.push({
          name: name,
          capacity: capacity,
          utilisation: utilisation
        });
      }

    });
  }

  return reservoirs;
}

function findReservoir(array, name) {
  var found = array.filter(function(reservoir) { return reservoir.name == name; });
  if(found.length){
    return found[0];
  }
}

function updateDatabase (reservoirs) {
  reservoirs.forEach(function (reservoir) {
    var sql;
    var params;

    if(reservoir.id) {
      sql = "UPDATE reservoirs SET utilisation = $1 WHERE id = $2";
      params = [reservoir.utilisation, reservoir.id];
    }
    else {
      sql = "INSERT INTO reservoirs (name, capacity, utilisation) VALUES ($1, $2, $3)";
      params = [reservoir.name, reservoir.capacity, reservoir.utilisation];
    }

    query(sql, params).catch(function(error) { console.error(error); });
  });
}
