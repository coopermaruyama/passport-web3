## Web3 Passport Strategy

Web3 strategy for passport which authenticates the user by decoding a message
signed with the user's ETH address, and checking if it matches the address
that they are trying to authenticate.

### Setup
```js
const Web3Strategy = require('passport-web3');

/**
 * Called when authorization succeeds. Perform any additional verification here,
 * and either return the user's data (if valid), or deny authorization by
 * passing an error to the `done` callback.
 */
const onAuth = (address, done) => {
  // optional additional validation. To deny auth:
  // done(new Error('User is not authorized.'));
  User.findOne({ address }, (err, user) => done(err, user));
};
const web3Strategy = new Web3Strategy(onAuth);

passport.use(web3Strategy);

// endpoint
app.post('/login', passport.authenticate('web3'));
```

### Usage (client-side)

```js
const ethUtil = require('ethereumjs-util');

// The contents of the message can be anything
const rawMessage = 'Some message';
const msg = ethUtil.bufferToHex(new Buffer(rawMessage, 'utf8'));
const address = web3.eth.accounts[0];
const handleSignature = (err, signed) => {
  if (!err) {
    const fetchOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }.
      body: JSON.stringify({ address, msg, signed })
    };

    fetch('/login', fetchOpts).then(res => {
      if (res.status >= 200 && res.status <= 300) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    }).then(json => {
      // Auth succeeded
    }).catch(err => {
      // Auth failed
    })
  }
};

web3.personal.sign(hex, address, handleSign);
```
