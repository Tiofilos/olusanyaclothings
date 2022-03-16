/* eslint-disable no-unused-expressions */
/* global describe, it, beforeEach */
const chai = require('chai');
const chaiHttp = require('chai-http');

require('mongoose');

process.env.NODE_ENV = 'test';

const Event = require('../src/models/event');
const app = require('../src');

const { expect } = chai;

chai.use(chaiHttp);

describe('Event', () => {
  beforeEach((done) => {
    // Before each test we empty the database
    Event.deleteMany({}, () => {
      done();
    });
  });

  describe('/GET events', () => {
    it('should GET all the events', (done) => {
      chai.request(app)
        .get('/events')
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(200);
          expect(res.body).is.an('array');
          expect(res.body.length).is.equal(0);
          done();
        });
    });
  });

  describe('/GET/:id event', () => {
    it('should not GET a non-existent event', (done) => {
      chai.request(app)
        .get('/event/non-existent-event-id')
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(404);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should GET an event', (done) => {
      const title = 'Light theatre';
      const datetime = new Date();
      const createdEvent = new Event({
        id: 'event-id-here',
        title,
        datetime,
      });

      createdEvent.save((error, event) => {
        expect(error).is.null;
        chai.request(app)
          .get(`/event/${event.id}`)
          .end((err, res) => {
            expect(err).is.null;
            expect(res).has.status(200);
            expect(res.body).is.an('object');
            expect(res.body).has.property('title').that.is.equal(title);
            expect(res.body).has.property('description').that.is.equal('');
            expect(res.body).has.property('pictureUrl').that.is.null;
            expect(res.body).has.property('datetime');
            expect(new Date(res.body.datetime).toString()).that.is.equal(datetime.toString());
            done();
          });
      });
    });
  });

  describe('/POST event', () => {
    it('should not POST an event object with missing data', (done) => {
      const eventObject = {
        title: 'Upcomming event for laptop day',
        description: 'The best event ever created',
      };

      chai.request(app)
        .post('/event')
        .send(eventObject)
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should POST an event object', (done) => {
      const title = 'Upcomming event for laptop day';
      const description = 'The best event ever created';
      const datetime = new Date();
      const pictureUrl = null;

      const eventObject = {
        title,
        description,
        datetime,
      };

      chai.request(app)
        .post('/event')
        .send(eventObject)
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(200);
          expect(res.body).has.property('title').that.is.equal(title);
          expect(res.body).has.property('description').that.is.equal(description);
          expect(res.body).has.property('pictureUrl').that.is.equal(pictureUrl);
          expect(res.body).has.property('datetime');
          expect(new Date(res.body.datetime).toString()).that.is.equal(datetime.toString());
          done();
        });
    });
  });

  describe('/PUT/:id event', () => {
    it('should UPDATE an event object given the id', (done) => {
      const title = 'Light theatre';
      const datetime = new Date();
      const createdEvent = new Event({
        id: 'event-id-here',
        title,
        datetime,
      });

      const updatedEvent = {
        title: 'Green theatre',
        description: 'Ecology',
        pictureUrl: 'http://victoriahall.theater/img/ecology-event-banner.jpg',
      };

      createdEvent.save((error, event) => {
        expect(error).is.null;
        chai.request(app)
          .put(`/event/${event.id}`)
          .send(updatedEvent)
          .end((err, res) => {
            expect(err).is.null;
            expect(res).has.status(200);
            expect(res.body).is.an('object');
            expect(res.body).has.property('title').is.equal(updatedEvent.title);
            expect(res.body).has.property('description').is.equal(updatedEvent.description);
            expect(res.body).has.property('pictureUrl').is.equal(updatedEvent.pictureUrl);
            done();
          });
      });
    });
  });

  describe('/DELETE/:id event', () => {
    it('should not DELETE a non-existent event', (done) => {
      chai.request(app)
        .delete('/event/non-existent-event-id')
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should DELETE an event object', (done) => {
      const createdEvent = new Event({
        id: 'event-id-here',
        title: 'Dark theatre',
        datetime: new Date(),
      });

      createdEvent.save((error, event) => {
        expect(error).is.null;
        chai.request(app)
          .delete(`/event/${event.id}`)
          .end((err, res) => {
            expect(err).is.null;
            expect(res.body).has.property('ok').that.is.true;
            expect(res.body).has.property('affected').that.is.equal(1);
            done();
          });
      });
    });
  });
});
