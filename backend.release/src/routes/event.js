const log = require('npmlog');
const express = require('express');
const { v4: uuid } = require('uuid');
const Event = require('../models/event');

const router = express.Router();

router.get('/events', (req, res) => {
  log.verbose('/events', 'finding all events');
  Event.find({}, {}, {}, (error, data) => {
    if (error) {
      log.error('/events', error);
      res.status(500).json({ error: 'Cannot find events' });
      return;
    }
    res.json(data);
  });
});

router.post('/events/upcoming', (req, res) => {
  log.verbose('/events/upcoming', 'finding all upcoming events');
  if (req.body.datetime === undefined) {
    log.warn('req.body.datetime', req.body.datetime);
    res.status(400).json({ error: 'Missing datetime' });
    return;
  }

  const { isLoyalty } = req.body;
  const datetime = new Date(req.body.datetime);
  const tomorrowDatetime = new Date(datetime + (1000 * 60 * 60 * 24));
  const nextWeekDatetime = new Date(datetime + (1000 * 60 * 60 * 24 * 7));

  log.info('//datetime', '%O and %O', datetime, nextWeekDatetime);
  let filter = {};

  if (isLoyalty === undefined) {
    log.warn('req.body.isLoyalty', isLoyalty);
    // res.status(400).json({ error: 'Missing isLoyalty' });
  } else {
    filter = {
      datetime: {
        $gte: datetime,
        $lt: (isLoyalty) ? nextWeekDatetime : tomorrowDatetime,
      },
    };
  }

  log.info('/events/upcomming:filterfilter', filter);

  Event.find({}, {}, {}, (error, data) => {
    if (error) {
      log.error('/events', error);
      res.status(500).json({ error: 'Cannot find upcoming events' });
      return;
    }
    log.info('data.length', data.length);
    res.json(data);
  });
});

router.get('/event/:id', (req, res) => {
  log.verbose('/event/:id', 'finding event for id %s', req.params.id);
  Event.findOne({ id: req.params.id }, (error, data) => {
    if (error) {
      log.error('/event', error);
      res.status(500).json({ error: 'Cannot find that event' });
      return;
    }
    if (!data) {
      res.status(404).json({ error: 'No event found with that id' });
      return;
    }
    res.json(data);
  });
});

router.post('/event', (req, res) => {
  log.verbose('/event/:id', 'creating new event: %j', req.body);
  // Valid data
  if (!req.body.title || !req.body.datetime) {
    res.status(400).json({ error: 'Missing data' });
    return;
  }
  // Create the event
  const event = new Event({
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    pictureUrl: req.body.pictureUrl || null,
    datetime: req.body.datetime,
  });

  // Save it
  event.save((error, document) => {
    if (error) {
      res.status(500).json({ error: 'You cannot create this event' });
      return;
    }
    res.json(document);
  });
});

router.put('/event/:id', (req, res) => {
  log.verbose('/event/:id', 'updating new event: %j', req.body);
  Event.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, (err, doc) => {
    if (err) {
      res.status(400).json({ error: 'Cannot update this event' });
      return;
    }
    res.json(doc);
  });
});

router.delete('/event/:id', (req, res) => {
  log.verbose('/event/:id', 'deleting the event: %j', req.params.id);
  Event.deleteOne({ id: req.params.id }, (error, query) => {
    if (error) {
      res.status(500).json({ error: 'Cannot delete this event' });
      return;
    }
    if (query.deletedCount === 0) {
      res.status(400).json({ error: 'No events was deleted' });
      return;
    }
    res.json({ ok: true, affected: query.deletedCount });
  });
});

module.exports = router;
