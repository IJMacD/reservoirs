var mysql = require('mysql');

module.exports = {
  getReservoirs: function () {
    return query("SELECT id,name,utilisation,capacity,image FROM reservoirs");
  },

  update: function (reservoir, time) {
    var sql;
    var params;

    if (reservoir.id) {
      sql = "UPDATE reservoirs SET utilisation = ? WHERE id = ?";
      params = [reservoir.utilisation, reservoir.id];
    }
    else {
      sql = "INSERT INTO reservoirs (name, capacity, utilisation) VALUES (?, ?, ?) RETURNING id";
      params = [reservoir.name, reservoir.capacity, reservoir.utilisation];
    }

    return query(sql, params).then(function (result) {
      var id = reservoir.id || result.rows[0].id;
      var sql = "INSERT INTO reservoirs_history (reservoir_id, time, capacity, utilisation) VALUES (?, ?, ?, ?)";
      reservoir.id = id;

      // Server timezone has been set to +00:00 for this connection
      // `time` column is TIMESTAMP which saves it as the correct point in time.
      // n.b. DATETIME column does NOT store the correct moment in time (i.e. it
      // is timezone agnostic)
      const serverDate = new Date(time).toISOString().replace("T", " ").replace("Z", "");

      return query(sql, [id, serverDate, reservoir.capacity, reservoir.utilisation]);
    }).catch(function (error) { console.error(error); }).then(() => reservoir);
  }
};

function query(sql, params) {
  return new Promise(function (resolve, reject) {
    const {
      DATABASE_HOST,
      DATABASE_NAME,
      DATABASE_USER,
      DATABASE_PASS,
    } = process.env;
    const connectionString = `mysql://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}/${DATABASE_NAME}`;

    const connection = mysql.createConnection(connectionString);

    connection.connect(function (err) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      connection.query("SET time_zone = '+00:00';", null, () => {

        connection.query(sql, params, function (err, results, fields) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(results);

          connection.end();
        });

      });
    });

  });
}
