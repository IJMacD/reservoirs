var Reservoirs = require('./Reservoirs');

Reservoirs.checkReservoirs().then(function (reservoirs) {
  console.log("Loaded " + reservoirs.length + " reservoirs");
});
