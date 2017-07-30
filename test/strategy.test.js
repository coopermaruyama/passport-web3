/* global describe, it, expect */

var Strategy = require('../src/strategy');


describe('Strategy', function() {

  var strategy = new Strategy(function(){});

  it('should be named local', function() {
    expect(strategy.name).to.equal('web3');
  });

  it('should throw if constructed without a verify callback', function() {
    expect(function() {
      var s = new Strategy();
    }).to.throw(TypeError, 'Web3Strategy requires an onAuth callback');
  });

});
