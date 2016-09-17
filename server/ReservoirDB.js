var pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  getReservoirs: function () {
    return query("SELECT id,name,utilisation,capacity,image FROM reservoirs").then(r => r.rows);
  },

  update: function (reservoir, time) {
    var sql;
    var params;

    if(reservoir.id) {
      sql = "UPDATE reservoirs SET utilisation = $1 WHERE id = $2";
      params = [reservoir.utilisation, reservoir.id];
    }
    else {
      sql = "INSERT INTO reservoirs (name, capacity, utilisation) VALUES ($1, $2, $3) RETURNING id";
      params = [reservoir.name, reservoir.capacity, reservoir.utilisation];
    }

    return query(sql, params).then(function(result){
      var id = reservoir.id || result.rows[0].id;
      var sql = "INSERT INTO reservoirs_history (reservoir_id, time, capacity, utilisation) VALUES ($1, $2, $3, $4)";
      reservoir.id = id;

      return query(sql, [id, time, reservoir.capacity, reservoir.utilisation]);
    }).catch(function(error) { console.error(error); }).then(() => reservoir);
  }
};

function query (sql, params) {
  return new Promise(function(resolve, reject){
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) { console.error(err); reject(err); }
      else {
        client.query(sql, params, function(err, result) {
          done();
          if (err)
          { console.error(err); reject(err); }
          else
          { resolve(result); }
        });
      }
    });
  });
}
