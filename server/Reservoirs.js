
/**
 * @typedef Reservoir
 * @property {string} id
 * @property {string} name
 * @property {number} capacity
 * @property {number} utilisation
 * @property {string} image
 */

module.exports = {

  checkAndUpdateReservoirs: async function () {
    var WSD = require('./WSD');
    var ReservoirDB = require('./ReservoirDB');

    const results = await Promise.all([
      WSD.getReservoirs(),
      ReservoirDB.getReservoirs()
    ]);

    var fetchData = results[0];
    var dbData = results[1];

    var time = Date.now();

    let changed = 0;

    for (const fetchReservoir of fetchData) {

      var dbReservoir = dbData.find(r => r.name === fetchReservoir.name);

      if (!dbReservoir) {
        console.log(`New reservoir: ${fetchReservoir.name}`);
      }

      var reservoir = {
        id: dbReservoir?.id,
        name: fetchReservoir.name,
        capacity: fetchReservoir.capacity,
        utilisation: fetchReservoir.utilisation,
        image: dbReservoir?.image,
      };

      if (dbReservoir) {
        // Just for logging verboseness
        var hasChanged = dbReservoir.utilisation.toFixed(5) !== fetchReservoir.utilisation.toFixed(5);

        if (hasChanged) {
          console.log(`${fetchReservoir.name} has changed from ${(dbReservoir.utilisation * 100).toFixed(3)}% to  ${(fetchReservoir.utilisation * 100).toFixed(3)}%`);
          changed++;
        }
      }

      // Always add history to database
      ReservoirDB.update(reservoir, time);
    }

    return {
      reservoirCount: fetchData.length,
      changedCount: changed,
    };
  }
};
