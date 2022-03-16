/* eslint-disable dot-notation */
const seatLocation = require('./seatLocation');
const range = require('./range');

const distribution = {};

// For stalls

distribution[seatLocation.stalls] = {};

['AA', 'BB', 'CC', 'DD'].forEach((row) => {
  distribution[seatLocation.stalls][row] = [...range(1, 15), ...range(15, 29)];
});

['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach((row) => {
  distribution[seatLocation.stalls][row] = [...range(1, 15), ...range(15, 29)];
});

['H', 'J'].forEach((row) => {
  distribution[seatLocation.stalls][row] = [...range(3, 15), ...range(15, 27)];
});

['K', 'L', 'M', 'N', 'P', 'Q', 'R'].forEach((row) => {
  distribution[seatLocation.stalls][row] = [...range(1, 15), ...range(15, 29)];
});

distribution[seatLocation.stalls]['S'] = [...range(1, 12), ...range(14, 25)];
distribution[seatLocation.stalls]['T'] = [...range(1, 12), ...range(12, 23)];
distribution[seatLocation.stalls]['U'] = [...range(1, 11), ...range(11, 21)];
distribution[seatLocation.stalls]['V'] = [...range(1, 10), ...range(10, 19)];

// For circle

distribution[seatLocation.circle] = {};

distribution[seatLocation.circle]['A'] = [...range(1, 77)];
distribution[seatLocation.circle]['B'] = [...range(1, 83)];
distribution[seatLocation.circle]['C'] = [...range(1, 90)];
distribution[seatLocation.circle]['D'] = [...range(1, 3), ...range(7, 26), ...range(30, 32)];
distribution[seatLocation.circle]['E'] = [...range(1, 20)];

// For upper circle

distribution[seatLocation.upperCircle] = {};

distribution[seatLocation.upperCircle]['A'] = [...range(1, 89)];
distribution[seatLocation.upperCircle]['B'] = [...range(1, 27), ...range(32, 63), ...range(68, 94)];
distribution[seatLocation.upperCircle]['C'] = [...range(1, 77)];
distribution[seatLocation.upperCircle]['D'] = [...range(1, 29)];
distribution[seatLocation.upperCircle]['E'] = [...range(1, 28)];
distribution[seatLocation.upperCircle]['F'] = [...range(1, 26)];
distribution[seatLocation.upperCircle]['G'] = [...range(1, 23)];
distribution[seatLocation.upperCircle]['H'] = [...range(1, 19)];
distribution[seatLocation.upperCircle]['J'] = [...range(1, 16)];
distribution[seatLocation.upperCircle]['K'] = [...range(1, 11)];
distribution[seatLocation.upperCircle]['L'] = [...range(1, 7)];

// Export them

module.exports = distribution;
