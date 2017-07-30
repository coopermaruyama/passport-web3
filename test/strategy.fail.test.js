/* global describe, it, expect, before */
/* jshint expr: true */
import chai from 'chai';
import Strategy from '../src/strategy';
import validParams from './helpers/valid-params';
import invalidParams from './helpers/invalid-params';

describe('Strategy', function() {

  describe('failing authentication', function() {
    var strategy = new Strategy(function(address, done) {
      return done(null, false);
    });

    var err, code;

    before(function(done) {
      chai.passport.use(strategy)
        .fail(function(_err, _code) {
          err = _err;
          code = _code;
          done();
        })
        .req(function(req) {
          req.body = invalidParams;
        })
        .authenticate();
    });

    it('should fail', function() {
      expect(err).to.be.an('object').and.have.keys('message');
      expect(err.message).to.include('recovered address didnt match')
      expect(code).to.equal(400);
    });
  });

  describe('failing authentication with info', function() {
    var strategy = new Strategy(function(address, done) {
      return done(null, false, { message: 'authentication failed' });
    });

    var err, code;

    before(function(done) {
      chai.passport.use(strategy)
        .fail(function(_err, _code) {
          err = _err;
          code = _code;
          done();
        })
        .req(function(req) {
          req.body = validParams;
        })
        .authenticate();
    });

    it('should fail', function() {
      expect(err).to.be.an('object');
      expect(err.message).to.equal('authentication failed');
    });
  });

});
