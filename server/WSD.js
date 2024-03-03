const url = "https://www.wsd.gov.hk/en/core-businesses/operation-and-maintenance-of-waterworks/waterworks/current-storage-position-of-impounding-reservoirs/index.html";

/**
 * @typedef WSDReservoir
 * @property {string} name
 * @property {number} capacity
 * @property {number} utilisation
 */

module.exports = {
  /**
   *
   * @returns {Promise<WSDReservoir[]>}
   */
  getReservoirs: async function () {
    const html = await fetch(url);
    return scrapeHTML(html);
  }
};

/**
 * @param {string} url
 */
function fetch(url) {
  var request = require('request');

  return new Promise(function (resolve, reject) {
    request(url, function (error, response, html) {
      if (error) {
        reject(error);
      }
      resolve(html);
    });
  });
}

/**
 * @param {string} html
 * @returns {WSDReservoir[]}
 */
function scrapeHTML(html) {
  var cheerio = require('cheerio');

  var $ = cheerio.load(html);

  var table = $('table').get(1);

  var reservoirs = [];

  if (table) {
    $(table).find('tr').each(function () {
      var cells = $(this).find('td');
      if (cells.length === 3) {
        const name = $(cells[0]).text(),
          capacity = parseFloat($(cells[1]).text()) * 1e6,
          utilisation = parseFloat($(cells[2]).text()) / 100;

        // Exclude total row
        if (name.indexOf("TOTAL") == -1) {

          reservoirs.push({
            name: name,
            capacity: capacity,
            utilisation: utilisation
          });
        }
      }


    });
  }

  return reservoirs;
}
