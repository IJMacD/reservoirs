var Reservoirs = require('./server/Reservoirs');

Reservoirs.checkReservoirs().then(function(reservoirs) {
  console.log("Loaded " + reservoirs.length + " reservoirs");
  process.exit();
});
