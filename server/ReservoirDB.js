import mysql from 'mysql';

/**
 *
 * @returns {Promise<import('./Reservoirs').Reservoir[]>}
 */
export function getReservoirs() {
  return query("SELECT id,name,utilisation,capacity,image FROM reservoirs");
}

/**
 * Updates (or inserts) current reservoir data and logs history
 * @param {{id: string|undefined,name:string,capacity:number,utilisation:number}} reservoir
 * @param {number} time
 * @returns
 */
export async function update(reservoir, time) {
  var sql;
  var params;

  try {
    if (typeof reservoir.id !== "undefined") {
      sql = "UPDATE reservoirs SET utilisation = ? WHERE id = ?";
      params = [reservoir.utilisation, reservoir.id];
    }
    else {
      sql = "INSERT INTO reservoirs (name, capacity, utilisation) VALUES (?, ?, ?) RETURNING id";
      params = [reservoir.name, reservoir.capacity, reservoir.utilisation];
    }

    const result = await query(sql, params);

    var id = reservoir.id || result.rows[0].id;
    reservoir.id = id;

    var sql_2 = "INSERT INTO reservoirs_history (reservoir_id, time, capacity, utilisation) VALUES (?, ?, ?, ?)";

    // Server timezone has been set to +00:00 for this connection
    // `time` column is TIMESTAMP which saves it as the correct point in time.
    // n.b. DATETIME column does NOT store the correct moment in time (i.e. it
    // is timezone agnostic)
    const serverDate = new Date(time).toISOString().replace("T", " ").replace("Z", "");

    await query(sql_2, [id, serverDate, reservoir.capacity, reservoir.utilisation]);

  } catch (error) {
    console.error(error);
  }

  return reservoir;
}

/**
 * @param {string} sql
 * @param {(string|number)[]} [params]
 */
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

      // Queries are guaranteed to be sent in sequence
      connection.query("SET time_zone = '+00:00';");

      connection.query(sql, params, function (err, results, fields) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(results);
      });

      // Guarantees queries are completed before quit packet is sent to server
      connection.end();
    });

  });
}
