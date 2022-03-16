/* eslint-disable no-unused-expressions */
/* global describe, it, beforeEach, */
const chai = require('chai');
const chaiHttp = require('chai-http');

require('mongoose');

process.env.NODE_ENV = 'test';

const Reservation = require('../src/models/reservation');
const app = require('../src');

const { expect } = chai;

chai.use(chaiHttp);

describe('Reservation', () => {
  beforeEach((done) => {
    // Before each test we empty the database
    Reservation.deleteMany({}, () => {
      done();
    });
  });

  describe('/GET reservations', () => {
    it('should GET all the reservations', (done) => {
      chai.request(app)
        .get('/reservations')
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(200);
          expect(res.body).is.an('array');
          expect(res.body.length).is.equal(0);
          done();
        });
    });
  });

  describe('/GET/:id reservation', () => {
    it('should not GET a non-existent reservation', (done) => {
      chai.request(app)
        .get('/reservation/non-existent-reservation-id')
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(404);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should GET an reservation', (done) => {
      const eventId = 'the-reservation-id-here';
      const location = 'stalls';
      const row = 'AA';
      const number = 2;
      const price = 48.9;

      const createdReservation = new Reservation({
        id: 'reservation-id-here',
        eventId,
        location,
        row,
        number,
        price,
      });

      createdReservation.save((error, reservation) => {
        expect(error).is.null;
        chai.request(app)
          .get(`/reservation/${reservation.id}`)
          .end((err, res) => {
            expect(err).is.null;
            expect(res).has.status(200);
            expect(res.body).is.an('object');
            expect(res.body).has.property('eventId').that.is.equal(eventId);
            expect(res.body).has.property('location').that.is.equal(location);
            expect(res.body).has.property('row').that.is.equal(row);
            expect(res.body).has.property('number').that.is.equal(number);
            expect(res.body).has.property('price').that.is.equal(price);
            done();
          });
      });
    });
  });

  describe('/POST reservation', () => {
    it('should not POST an reservation object with missing data', (done) => {
      const reservationObject = {
        eventId: 'the-event-id-here',
      };

      chai.request(app)
        .post('/reservation')
        .send(reservationObject)
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should POST an reservation object', (done) => {
      const eventId = 'the-event-id';
      const location = 'upperCircle';
      const row = 'F';
      const number = 10;
      const price = 98.2;

      const reservationObject = {
        eventId,
        location,
        row,
        number,
        price,
      };

      chai.request(app)
        .post('/reservation')
        .send(reservationObject)
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(200);
          expect(res.body).has.property('eventId').that.is.equal(eventId);
          expect(res.body).has.property('location').that.is.equal(location);
          expect(res.body).has.property('row').that.is.equal(row);
          expect(res.body).has.property('number').that.is.equal(number);
          expect(res.body).has.property('price').that.is.equal(price);
          done();
        });
    });
  });

  describe('/PUT/:id reservation', () => {
    it('should UPDATE an reservation object given the id', (done) => {
      const eventId = 'event-id';
      const location = 'circle';
      const row = 'a';
      const number = 12;
      const price = 23.4;

      const createdReservation = new Reservation({
        id: 'the-reservation-id',
        eventId,
        location,
        row,
        number,
        price,
      });

      const updatedReservation = {
        price: 34,
      };

      createdReservation.save((error, reservation) => {
        expect(error).is.null;
        chai.request(app)
          .put(`/reservation/${reservation.id}`)
          .send(updatedReservation)
          .end((err, res) => {
            expect(err).is.null;
            expect(res).has.status(200);
            expect(res.body).is.an('object');
            expect(res.body).has.property('price').is.equal(updatedReservation.price);
            done();
          });
      });
    });
  });

  describe('/DELETE/:id reservation', () => {
    it('should not DELETE a non-existent reservation', (done) => {
      chai.request(app)
        .delete('/reservation/non-existent-reservation-id')
        .end((err, res) => {
          expect(err).is.null;
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should DELETE an reservation object', (done) => {
      const eventId = 'event-id';
      const location = 'stalls';
      const row = 'q';
      const number = 2;
      const price = 23.4;

      const createdReservation = new Reservation({
        id: 'the-reservation-id',
        eventId,
        location,
        row,
        number,
        price,
      });

      createdReservation.save((error, reservation) => {
        expect(error).is.null;
        chai.request(app)
          .delete(`/reservation/${reservation.id}`)
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
