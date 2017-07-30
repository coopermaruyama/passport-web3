/* global describe, it, expect, before */

var chai = require('chai')
  , Strategy = require('../src/strategy');

describe('Strategy', function() {

  describe('encountering an error during verification', function() {
    var strategy = new Strategy(function(address, done) {
      done(new Error('something went wrong'));
    });

    var err;

    before(function(done) {
      chai.passport.use(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.address = '0x0b046f9e580ffe534ebae659d1fce83928793ff6';
          req.body.msg = '0x506c65617365206f6e6c79207369676e2074686973206d736720696620776520617265206f6e20726f7363612e776574727573742e696f3a2044643174623042702d504e32306d773671516579324e4a755458542d6a73542d2d6a5141';
          req.body.signed = '0xda004296098b9c3d6905c3d84e89790859c5e68a0f8047d56fe0944086cafcdd0bc01a0099b5a5958ded612ea951b7dcfca33ea5d64a497ac5ba6565f92345f01b';
        })
        .authenticate();
    });

    it('should error', function() {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('something went wrong');
    });
  });

  describe('encountering an exception during verification', function() {
    var strategy = new Strategy(function(username, password, done) {
      throw new Error('something went horribly wrong');
    });

    var err;

    before(function(done) {
      chai.passport.use(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.body = {};
          req.body.address = '0x0b046f9e580ffe534ebae659d1fce83928793ff6';
          req.body.msg = '0x506c65617365206f6e6c79207369676e2074686973206d736720696620776520617265206f6e20726f7363612e776574727573742e696f3a2044643174623042702d504e32306d773671516579324e4a755458542d6a73542d2d6a5141';
          req.body.signed = '0xda004296098b9c3d6905c3d84e89790859c5e68a0f8047d56fe0944086cafcdd0bc01a0099b5a5958ded612ea951b7dcfca33ea5d64a497ac5ba6565f92345f01b';
        })
        .authenticate();
    });

    it('should error', function() {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('something went horribly wrong');
    });
  });

});
