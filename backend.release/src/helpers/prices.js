const range = require('./range');
const seatLocation = require('./seatLocation');

const base = 10;

/**
 * Calc the price a seat for given data.
 * @param { String } location The location.
 * @param { String } row The row.
 * @param { Number } number The number.
 * @param { Boolean } isEvening Set if it is Matinee or Evening.
 * @returns Returns the price.
 */
function calc(location, row, number, isEvening) {
  const percent = (a, b) => {
    if (isEvening) return b;
    return a;
  };

  const complexCondiction = (rows, ranges) => {
    // Check if the rows is array or one row
    if (Array.isArray(rows)) {
      // If the rows is array, check if no thing is equal to return false
      if (rows.every((r) => r !== row)) return false;
      // If something is equal, then continue
    } else {
      // Otherwise, if the one row is different to query-value, then returns false
      // eslint-disable-next-line no-lonely-if
      if (rows !== row) return false;
      // ...
    }
    // If something was equal to the real row, and ranges is undefined, then
    // we will returns true
    if (ranges === undefined) return true;
    // Else, we have to check if something is into the range between min and max
    // value. Remember add 1 to the max value just because
    return ranges.some(([min, max]) => range(min, max + 1).includes(number));
  };

  if (location === seatLocation.stalls) {
    if (complexCondiction(['AA', 'BB', 'CC', 'DD'])) {
      return base * percent(2, 2.5);
    }
    if (complexCondiction(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'])) {
      return base * percent(1.5, 1.75);
    }
    if (complexCondiction(['P', 'Q', 'R', 'S', 'T', 'U', 'V'])) {
      return base * percent(1, 1.5);
    }
    return base;
  }

  if (location === seatLocation.circle) {
    if (complexCondiction('A', [[1, 6], [71, 76]])) return base * percent(1.5, 1.75);
    if (complexCondiction('B', [[1, 8], [75, 82]])) return base * percent(1.5, 1.75);
    if (complexCondiction('C', [[1, 8], [82, 89]])) return base * percent(1.5, 1.75);

    if (complexCondiction('A', [[7, 27], [50, 70]])) return base * percent(1.25, 1.5);
    if (complexCondiction('B', [[9, 31], [52, 74]])) return base * percent(1.25, 1.5);
    if (complexCondiction('C', [[9, 34], [56, 81]])) return base * percent(1.25, 1.5);

    if (complexCondiction('A', [[28, 49]])) return base * percent(2.1, 2.2);
    if (complexCondiction('B', [[32, 51]])) return base * percent(2.1, 2.2);
    if (complexCondiction('C', [[35, 55]])) return base * percent(2.1, 2.2);
    if (complexCondiction(['D', 'E'])) return base * percent(2.1, 2.2);
  }

  if (location === seatLocation.upperCircle) {
    if (complexCondiction('A', [[1, 6], [83, 88]])) return base * percent(0.8, 1);
    if (complexCondiction('B', [[1, 8], [86, 93]])) return base * percent(0.8, 1);
    if (complexCondiction('C', [[1, 8], [69, 76]])) return base * percent(0.8, 1);

    if (complexCondiction('A', [[7, 32], [57, 82]])) return base * percent(0.5, 0.7);
    if (complexCondiction('B', [[9, 34], [80, 85]])) return base * percent(0.5, 0.7);
    if (complexCondiction('C', [[9, 24], [53, 68]])) return base * percent(0.5, 0.7);

    if (complexCondiction('A', [[33, 56]])) return base * percent(0.75, 1);
    if (complexCondiction('B', [[35, 59]])) return base * percent(0.75, 1);
  }

  return base;
}

module.exports = calc;
