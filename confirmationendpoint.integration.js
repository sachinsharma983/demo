'use strict';

var app = require('../..');
import request from 'supertest';

var newConfirmationendpoint;

describe('Confirmationendpoint API:', function() {

  describe('GET /api/confirmationendpoints', function() {
    var confirmationendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/confirmationendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          confirmationendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(confirmationendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/confirmationendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/confirmationendpoints')
        .send({
          name: 'New Confirmationendpoint',
          info: 'This is the brand new confirmationendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newConfirmationendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created confirmationendpoint', function() {
      expect(newConfirmationendpoint.name).to.equal('New Confirmationendpoint');
      expect(newConfirmationendpoint.info).to.equal('This is the brand new confirmationendpoint!!!');
    });

  });

  describe('GET /api/confirmationendpoints/:id', function() {
    var confirmationendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/confirmationendpoints/' + newConfirmationendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          confirmationendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      confirmationendpoint = {};
    });

    it('should respond with the requested confirmationendpoint', function() {
      expect(confirmationendpoint.name).to.equal('New Confirmationendpoint');
      expect(confirmationendpoint.info).to.equal('This is the brand new confirmationendpoint!!!');
    });

  });

  describe('PUT /api/confirmationendpoints/:id', function() {
    var updatedConfirmationendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/confirmationendpoints/' + newConfirmationendpoint._id)
        .send({
          name: 'Updated Confirmationendpoint',
          info: 'This is the updated confirmationendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedConfirmationendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConfirmationendpoint = {};
    });

    it('should respond with the updated confirmationendpoint', function() {
      expect(updatedConfirmationendpoint.name).to.equal('Updated Confirmationendpoint');
      expect(updatedConfirmationendpoint.info).to.equal('This is the updated confirmationendpoint!!!');
    });

  });

  describe('DELETE /api/confirmationendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/confirmationendpoints/' + newConfirmationendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when confirmationendpoint does not exist', function(done) {
      request(app)
        .delete('/api/confirmationendpoints/' + newConfirmationendpoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
