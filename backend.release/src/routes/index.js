const express = require('express');
const event = require('./event');
const reservation = require('./reservation');
const price = require('./price');

const router = express.Router();

router.use(event);
router.use(reservation);
router.use(price);

router.get('/', (req, res) => res.json({ message: 'It works' }));

module.exports = router;
