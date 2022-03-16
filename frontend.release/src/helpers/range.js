/**
 * Returns a range of value from minimum to maximum value.
 * @param { Number } minValue Minimum value
 * @param { Number } [maxValue] Maximum value
 * @returns Range
 */
const range = (minValue, maxValue) => {
  if (maxValue === undefined) {
    maxValue = minValue;
    minValue = 0;
  }

  if (maxValue < minValue) {
    const aux = maxValue;
    maxValue = minValue;
    minValue = aux;
  }

  return Array(maxValue - minValue)
    .fill()
    .map((_, index) => minValue + index);
}

export default range;
