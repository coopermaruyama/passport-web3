## Web3 Passport Strategy

### Usage

```js
var Web3Strategy = require('passport-web3');

var web3Strategy = new Web3Strategy(
  (req, ethAddress, msg, signedMsg, done) => {

      User.findOne({ ethAddress }, (err, user) => {
        if (user) {
        return done(null, user);
      } else {
        throw Error('Could not find user');
      }
    });
  }
);

// endpoint
app.post('/login', passport.authenticate('web3'));
```
