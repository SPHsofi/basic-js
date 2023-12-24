const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (!date) {
    return CORRECT_RESULT_MSG;
  }

  if (!(date instanceof Date) || isNaN(date)) {
    return INCORRECT_RESULT_MSG;
  }

  const indexMonth = date.getMonth()
  if(2 <= indexMonth && indexMonth <= 4) {
    return 'spring'
  }
  else if(5 <= indexMonth && indexMonth <= 7) {
    return 'summer'
  }
  else if(8 <= indexMonth && indexMonth <= 10) {
    return 'autumn'
  }
  else {
    return 'winter'
  }
}

module.exports = {
  getSeason
};
