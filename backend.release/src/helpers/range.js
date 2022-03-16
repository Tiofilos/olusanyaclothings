/**
 * Returns a range of value from minimum to maximum value.
 * @param { Number } minValue Minimum value
 * @param { Number } [maxValue] Maximum value
 * @returns Range
 */
const range = (minValue, maxValue) => {
  let maximumValue = maxValue;
  let minimumValue = minValue;

  if (maximumValue === undefined) {
    maximumValue = minimumValue;
    minimumValue = 0;
  }

  if (maximumValue < minimumValue) {
    const aux = maximumValue;
    maximumValue = minimumValue;
    minimumValue = aux;
  }

  return Array(maximumValue - minimumValue)
    .fill()
    .map((_, index) => minimumValue + index);
};

module.exports = range;
