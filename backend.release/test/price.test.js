/* eslint-disable no-unused-expressions */
/* global describe, it */
const chai = require('chai');
const chaiHttp = require('chai-http');

require('mongoose');

process.env.NODE_ENV = 'test';

const app = require('../src');

const { expect } = chai;

chai.use(chaiHttp);

describe('Price', () => {
  describe('# missing data', () => {
    it('should show ERROR if number does not exist', (done) => {
      chai.request(app)
        .get('/price/stalls/AA/100')
        .end((err, res) => {
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should show ERROR if location does not exist', (done) => {
      chai.request(app)
        .get('/price/home/AA/1')
        .end((err, res) => {
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should show ERROR if row does not exist', (done) => {
      chai.request(app)
        .get('/price/stalls/floor/1')
        .end((err, res) => {
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });
  });

  describe('# good data', () => {
    it('should show result stalls #1', (done) => {
      chai.request(app)
        .get('/price/stalls/AA/1')
        .end((err, res) => {
          expect(res).has.status(200);
          expect(res.body).has.property('prices');
          expect(res.body).has.property('prices').has.property('matinee').equal(20);
          expect(res.body).has.property('prices').has.property('evening').equal(25);
          done();
        });
    });

    it('should show result stalls #2', (done) => {
      chai.request(app)
        .get('/price/stalls/N/1')
        .end((err, res) => {
          expect(res).has.status(200);
          expect(res.body).has.property('prices');
          expect(res.body).has.property('prices').has.property('matinee').equal(10);
          expect(res.body).has.property('prices').has.property('evening').equal(10);
          done();
        });
    });

    it('should show result circle #1', (done) => {
      chai.request(app)
        .get('/price/circle/B/30')
        .end((err, res) => {
          expect(res).has.status(200);
          expect(res.body).has.property('prices');
          expect(res.body).has.property('prices').has.property('matinee').equal(12.5);
          expect(res.body).has.property('prices').has.property('evening').equal(15);
          done();
        });
    });

    it('should show result circle #2', (done) => {
      chai.request(app)
        .get('/price/circle/D/1')
        .end((err, res) => {
          expect(res).has.status(200);
          expect(res.body).has.property('prices');
          expect(res.body).has.property('prices').has.property('matinee').equal(21);
          expect(res.body).has.property('prices').has.property('evening').equal(22);
          done();
        });
    });

    it('should show result upper circle #1', (done) => {
      chai.request(app)
        .get('/price/upperCircle/C/69')
        .end((err, res) => {
          expect(res).has.status(200);
          expect(res.body).has.property('prices');
          expect(res.body).has.property('prices').has.property('matinee').equal(8);
          expect(res.body).has.property('prices').has.property('evening').equal(10);
          done();
        });
    });

    it('should show result upper circle #2', (done) => {
      chai.request(app)
        .get('/price/upperCircle/A/35')
        .end((err, res) => {
          expect(res).has.status(200);
          expect(res.body).has.property('prices');
          expect(res.body).has.property('prices').has.property('matinee').equal(7.5);
          expect(res.body).has.property('prices').has.property('evening').equal(10);
          done();
        });
    });
  });

  describe('# reserved seats', () => {
    it('should ERROR because this seat is reserved', (done) => {
      chai.request(app)
        .get('/price/stalls/S/12')
        .end((err, res) => {
          expect(res).has.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });
  });
});
