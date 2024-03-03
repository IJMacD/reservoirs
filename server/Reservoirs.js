
/**
 * @typedef Reservoir
 * @property {string?} id
 * @property {string} name
 * @property {number} capacity
 * @property {number} utilisation
 * @property {string?} image
 */

module.exports = {
  /**
   * Checks Reservoirs upstream and updates database as necessary
   * @returns {Promise<Reservoir[]>}
   */
  checkReservoirs: async function () {
    var WSD = require('./WSD');
    var ReservoirDB = require('./ReservoirDB');

    const results = await Promise.all([
      WSD.getReservoirs(),
      ReservoirDB.getReservoirs()
    ]);

    var fetchData = results[0];
    var dbData = results[1];

    var time = Date.now();

    var reservoirs = fetchData.map(function (fetchReservoir) {

      var dbReservoir = dbData.find(r => r.name === fetchReservoir.name);

      var reservoir = {
        id: dbReservoir?.id ?? null,
        name: fetchReservoir.name,
        capacity: fetchReservoir.capacity,
        utilisation: fetchReservoir.utilisation,
        image: dbReservoir?.image ?? null
      };

      if (!dbReservoir) {
        console.warn(`Unable to find reservoir ${fetchReservoir.name} in database`);
        return reservoir;
      }

      // Check if reservoir utilisation has changed (more than float limits) and
      // update as necessary.
      var hasChanged = dbReservoir.utilisation.toFixed(5) !== fetchReservoir.utilisation.toFixed(5);

      if (hasChanged) {
        return ReservoirDB.update(reservoir, time).then(() => reservoir);
      }

      return reservoir;
    });

    return await Promise.all(reservoirs);
  }
};
