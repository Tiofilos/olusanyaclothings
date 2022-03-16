const log = require('npmlog');
const express = require('express');
const { v4: uuid } = require('uuid');
const Reservation = require('../models/reservation');
const seatDistribution = require('../helpers/seatDistribution');
const calcPrice = require('../helpers/prices');

const router = express.Router();

router.get('/reservations', (req, res) => {
  log.verbose('/reservations', 'finding all reservations');
  Reservation.find({}, {}, {}, (error, data) => {
    if (error) {
      log.error('/reservations', error);
      res.status(500).json({ error: 'Cannot find reservations' });
      return;
    }
    res.json(data);
  });
});

router.get('/reservation/free/:eventId', (req, res) => {
  log.verbose('/reservation', 'finding all free seats');
  log.info('/reservation', 'finding eventId=%s', req.params.eventId);
  Reservation.find({ eventId: req.params.eventId }, {}, {}, (error, data) => {
    if (error) {
      log.error('/reservation', error);
      res.status(500).json({ error: 'Cannot find free seats' });
      return;
    }
    if (!data) {
      log.verbose('/reservation', 'no data found, then will send all distribution');
      res.json(seatDistribution);
      return;
    }

    const reservations = [...data];
    const flatten = [];
    Object.entries(seatDistribution)
      .forEach(([location, seatingPosition]) => Object
        .entries(seatingPosition)
        .forEach(([row, numbers]) => numbers
          .forEach((number) => flatten.push([location, row, number]))));
    // Filter
    const filtered = flatten
      .filter(([location, row, number]) => (!reservations
        .some((r) => (
          location === r.location && row === r.row && number === r.number))));
    // Prepare data to send
    const distribution = {};
    filtered.forEach(([location, row, number]) => {
      if (distribution[location] === undefined) distribution[location] = {};
      if (distribution[location][row] === undefined) distribution[location][row] = [];
      distribution[location][row].push(number);
    });
    // Send data
    log.info('/resevation', 'reservations: %d', reservations.length);
    log.info('/resevation', 'flatten: %d', flatten.length);
    log.info('/resevation', 'filtered: %d', filtered.length);
    res.json(distribution);
  });
});

router.get('/reservation/:id', (req, res) => {
  log.verbose('/reservation/:id', 'finding reservation for id %s', req.params.id);
  Reservation.findOne({ id: req.params.id }, (error, data) => {
    if (error) {
      log.error('/reservation', error);
      res.status(500).json({ error: 'Cannot find that reservation' });
      return;
    }
    if (!data) {
      res.status(404).json({ error: 'No reservation found with that id' });
      return;
    }
    const document = { ...data.toObject() };
    delete document.password;
    res.json(data);
  });
});

router.post('/reservation/take/:eventId/:isEvening', (req, res) => {
  const { eventId, isEvening: strIsEvening } = req.params;
  const { location, row, number: strNumber } = req.body;

  if (!Number.parseInt(strNumber, 10)) {
    res.status(400).json({ error: `"${req.body.number}" is not a number` });
    return;
  }

  const number = Number.parseInt(strNumber, 10);
  const isEvening = strIsEvening === 'evening';

  // Check position
  if (!seatDistribution[location]) {
    const error = `the location ${location} not exist`;
    log.warn('/reservation/take', error);
    res.status(400).json({ error });
    return;
  }

  if (!seatDistribution[location][row]) {
    const error = `the row ${row} (at ${location}) not exist`;
    log.warn('/reservation/take', error);
    res.status(400).json({ error });
    return;
  }

  if (!seatDistribution[location][row].includes(number)) {
    const error = `the number ${number} (at ${location}/${row}) not exist`;
    log.warn('/reservation/take', error);
    res.status(400).json({ error });
    return;
  }

  const filter = {
    eventId,
    location,
    row,
    number,
  };

  Reservation.findOne(filter, (error, data) => {
    if (error) {
      log.error('/reservation/take/:eventId/:isEvening', error);
      res.status(500).json({ error: 'Cannot find that reservation' });
      return;
    }
    if (data) {
      res.status(401).json({ error: 'There is already a reservation made in that same place' });
      return;
    }
    // Reserve
    const price = calcPrice(location, row, number, isEvening);

    const reservation = new Reservation({
      id: uuid(),
      eventId,
      location,
      row,
      number,
      price,
    });

    reservation.save((err, doc) => {
      if (err) {
        res.status(500).json({ error: 'You cannot create this reservation' });
        return;
      }
      res.json(doc);
    });
  });
});

router.post('/reservation', (req, res) => {
  log.verbose('/reservation', 'creating new reservation: %j', req.body);
  // Validation
  // eslint-disable-next-line max-len
  if (!req.body.eventId || !req.body.location || !req.body.row || !req.body.number || !req.body.price) {
    res.status(400).json({ error: 'Missing data' });
    return;
  }
  // Create new reservation
  const reservation = new Reservation({
    id: uuid(),
    eventId: req.body.eventId,
    location: req.body.location,
    row: req.body.row,
    number: req.body.number,
    price: req.body.price,
  });

  // Save it
  reservation.save((error, document) => {
    if (error) {
      res.status(500).json({ error: 'You cannot create this reservation' });
      return;
    }
    res.json(document);
  });
});

router.put('/reservation/:id', (req, res) => {
  log.verbose('/reservation/:id', 'updating new reservation: %j', req.body);
  Reservation.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, (err, doc) => {
    if (err) {
      res.status(400).json({ error: 'Cannot update this reservation' });
      return;
    }
    res.json(doc);
  });
});

router.delete('/reservation/:id', (req, res) => {
  log.verbose('/reservation/:id', 'deleting the reservation: %j', req.params.id);
  Reservation.deleteOne({ id: req.params.id }, (error, query) => {
    if (error) {
      res.status(500).json({ error: 'Cannot delete this reservation' });
      return;
    }
    if (query.deletedCount === 0) {
      res.status(400).json({ error: 'No reservations was deleted' });
      return;
    }
    res.json({ ok: true, affected: query.deletedCount });
  });
});

module.exports = router;
