/* global describe, it, expect */

var strategy = require('../src/index.js');

describe('passport-web3', function() {

  it('should export Strategy constructor directly from package', function() {
    expect(strategy).to.be.a('function');
    expect(strategy).to.equal(strategy.Strategy);
  });

});
