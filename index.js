/**
 * Module dependencies.
 */
var passport = require('passport-strategy')
  , util = require('util')
  , sigUtil = require('eth-sig-util');


/**
 * `Strategy` constructor.
 *
 * The local authentication strategy authenticates requests based on the
 * credentials submitted through an HTML-based login form.
 *
 * Applications must supply a `verify` callback which accepts `username` and
 * `password` credentials, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurred, `err` should be set.
 *
 * Optionally, `options` can be used to change the fields in which the
 * credentials are found.
 *
 * Options:
 *   - `usernameField`  field name where the username is found, defaults to _username_
 *   - `passwordField`  field name where the password is found, defaults to _password_
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *     passport.use(new LocalStrategy(
 *       function(username, password, done) {
 *         User.findOne({ username: username, password: password }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('Web3Strategy requires a verify callback'); }

  passport.Strategy.call(this);
  this._verify = verify;
  this.name = 'web3';
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var ethAddress = req.body.ethAddress;
  var msg = req.body.msg;
  var signedMsg = req.body.signedMsg;
  var self = this;

  if (!ethAddress || !msg || !signedMsg) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
  }

  var params = {
    data: msg,
    sig: signedMsg
  };
  var recovered = sigUtil.recoverPersonalSignature(params);

  if (recovered !== ethAddress) {
    return this.fail({
      message: 'Invalid credentials (receovered address didnt match eth address)'
    }, 400);
  }

  function onUser(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }

  try {
    this._verify(req, ethAddress, msg, signedMsg, onUser);
  } catch (ex) {
    return self.error(ex);
  }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
