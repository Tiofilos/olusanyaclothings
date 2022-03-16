const log = require('npmlog');
const express = require('express');
const seatDistribution = require('../helpers/seatDistribution');
const calcPrice = require('../helpers/prices');

const router = express.Router();

router.get('/price/:location/:row/:number', (req, res) => {
  log.info('/prices', 'ask for price');
  if (!Number.parseInt(req.params.number, 10)) {
    res.status(400).json({ error: `"${req.params.number}" is not a number` });
    return;
  }

  const { location, row, number: strNumber } = req.params;
  const number = Number.parseInt(strNumber, 10);

  if (!seatDistribution[location]) {
    const error = `the location ${location} not exist`;
    log.warn('/prices', error);
    res.status(400).json({ error });
    return;
  }

  if (!seatDistribution[location][row]) {
    const error = `the row ${row} (at ${location}) not exist`;
    log.warn('/prices', error);
    res.status(400).json({ error });
    return;
  }

  if (!seatDistribution[location][row].includes(number)) {
    const error = `the number ${number} (at ${location}/${row}) not exist`;
    log.warn('/prices', error);
    res.status(400).json({ error });
    return;
  }

  const prices = {
    prices: {
      matinee: calcPrice(location, row, number, false),
      evening: calcPrice(location, row, number, true),
    },
  };

  res.json(prices);
});

module.exports = router;
