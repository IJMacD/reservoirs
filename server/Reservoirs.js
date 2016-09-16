
module.exports = {
  checkReservoirs: function () {
    var WSD = require('./WSD');
    var ReservoirDB = require('./ReservoirDB');

    return Promise.all([
      WSD.getReservoirs(),
      ReservoirDB.getReservoirs()
    ]).then(function(results){
      var fetchData = results[0];
      var dbData = results[1];
      var time = Date.now();

      var reservoirs = fetchData.map(function (fetchReservoir) {
        
        var dbReservoir = findReservoir(dbData, fetchReservoir.name) || {};

        var hasChanged = dbReservoir.utilisation != fetchReservoir.utilisation;

        var reservoir = {
          id: dbReservoir.id,
          name: fetchReservoir.name,
          capacity: fetchReservoir.capacity,
          utilisation: fetchReservoir.utilisation,
          image: dbReservoir.image
        };

        if(hasChanged) {
          ReservoirDB.update(reservoir, time);
        }

        return reservoir;
      });

      return reservoirs;
    });
  }
};

function findReservoir(array, name) {
  var found = array.filter(function(reservoir) { return reservoir.name == name; });
  if(found.length){
    return found[0];
  }
}
