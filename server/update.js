import * as Reservoirs from './Reservoirs';

Reservoirs.checkAndUpdateReservoirs().then(function ({ reservoirCount, changedCount }) {
  console.log(`Loaded ${reservoirCount} reservoirs. ${changedCount} had changed.`);
});
