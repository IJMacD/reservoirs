var mysql = require('mysql');

module.exports = {
  getReservoirs: function () {
    return query("SELECT id,name,utilisation,capacity,image FROM reservoirs").then(r => r.rows);
  },

  update: function (reservoir, time) {
    var sql;
    var params;

    if(reservoir.id) {
      sql = "UPDATE reservoirs SET utilisation = ? WHERE id = ?";
      params = [reservoir.utilisation, reservoir.id];
    }
    else {
      sql = "INSERT INTO reservoirs (name, capacity, utilisation) VALUES (?, ?, ?) RETURNING id";
      params = [reservoir.name, reservoir.capacity, reservoir.utilisation];
    }

    return query(sql, params).then(function(result){
      var id = reservoir.id || result.rows[0].id;
      var sql = "INSERT INTO reservoirs_history (reservoir_id, time, capacity, utilisation) VALUES (?, ?, ?, ?)";
      reservoir.id = id;

      return query(sql, [id, time, reservoir.capacity, reservoir.utilisation]);
    }).catch(function(error) { console.error(error); }).then(() => reservoir);
  }
};

function query (sql, params) {
  return new Promise(function(resolve, reject){
    if (typeof process.env.DATABASE_URL !== "string") {
      reject("DATABASE_URL not set");
      return;
    }

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.connect(function(err) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }


      connection.query(sql, params, function(err, results, fields) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(results);
      });

      connection.end();

    });

  });
}
