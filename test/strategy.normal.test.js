/* global describe, it, expect, before */
/* jshint expr: true */

import chai from 'chai';
import Strategy from '../src/strategy';
import validParams from './helpers/valid-params';
import invalidParams from './helpers/invalid-params';


describe('Strategy', function() {

  describe('handling a request with valid credentials in body', function() {
    var strategy = new Strategy(function(address, done) {
      if (address) {
        return done(null, { id: '1234' }, { scope: 'read' });
      }
      return done(null, false);
    });

    var user
      , info;

    before(function(done) {
      chai.passport.use(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.body = validParams;
        })
        .authenticate();
    });

    it('should supply user', function() {
      expect(user).to.be.an('object');
      expect(user.id).to.equal('1234');
    });

    it('should supply info', function() {
      expect(info).to.be.an('object');
      expect(info.scope).to.equal('read');
    });
  });

  describe('handling a request with valid credentials in query', function() {
    var strategy = new Strategy(function(address, done) {
      if (address) {
        return done(null, { id: '1234' }, { scope: 'read' });
      }
      return done(null, false);
    });

    var user
      , info;

    before(function(done) {
      chai.passport.use(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.query = validParams;
        })
        .authenticate();
    });

    it('should supply user', function() {
      expect(user).to.be.an('object');
      expect(user.id).to.equal('1234');
    });

    it('should supply info', function() {
      expect(info).to.be.an('object');
      expect(info.scope).to.equal('read');
    });
  });

  describe('handling a request without a body', function() {
    var strategy = new Strategy(function(address, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport.use(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an('object');
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

  describe('handling a request without a body, but no username and password', function() {
    var strategy = new Strategy(function(address, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport.use(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an('object');
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

  describe('handling a request with a body, but no signed message', function() {
    var strategy = new Strategy(function(address, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport.use(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.address = validParams.address;
          req.body.msg = validParams.msg;
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an('object');
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });

  describe('handling a request with a body, but no address', function() {
    var strategy = new Strategy(function(address, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function(done) {
      chai.passport.use(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.msg = validParams.msg;
          req.body.signed = validParams.signed;
        })
        .authenticate();
    });

    it('should fail with info and status', function() {
      expect(info).to.be.an('object');
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });
});
