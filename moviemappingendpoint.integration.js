'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviemappingendpoint;

describe('Moviemappingendpoint API:', function() {

  describe('GET /api/moviemappingendpoints', function() {
    var moviemappingendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviemappingendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviemappingendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviemappingendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/moviemappingendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviemappingendpoints')
        .send({
          name: 'New Moviemappingendpoint',
          info: 'This is the brand new moviemappingendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMoviemappingendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created moviemappingendpoint', function() {
      expect(newMoviemappingendpoint.name).to.equal('New Moviemappingendpoint');
      expect(newMoviemappingendpoint.info).to.equal('This is the brand new moviemappingendpoint!!!');
    });

  });

  describe('GET /api/moviemappingendpoints/:id', function() {
    var moviemappingendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviemappingendpoints/' + newMoviemappingendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviemappingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      moviemappingendpoint = {};
    });

    it('should respond with the requested moviemappingendpoint', function() {
      expect(moviemappingendpoint.name).to.equal('New Moviemappingendpoint');
      expect(moviemappingendpoint.info).to.equal('This is the brand new moviemappingendpoint!!!');
    });

  });

  describe('PUT /api/moviemappingendpoints/:id', function() {
    var updatedMoviemappingendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/moviemappingendpoints/' + newMoviemappingendpoint._id)
        .send({
          name: 'Updated Moviemappingendpoint',
          info: 'This is the updated moviemappingendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMoviemappingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviemappingendpoint = {};
    });

    it('should respond with the updated moviemappingendpoint', function() {
      expect(updatedMoviemappingendpoint.name).to.equal('Updated Moviemappingendpoint');
      expect(updatedMoviemappingendpoint.info).to.equal('This is the updated moviemappingendpoint!!!');
    });

  });

  describe('DELETE /api/moviemappingendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/moviemappingendpoints/' + newMoviemappingendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviemappingendpoint does not exist', function(done) {
      request(app)
        .delete('/api/moviemappingendpoints/' + newMoviemappingendpoint._id)
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
