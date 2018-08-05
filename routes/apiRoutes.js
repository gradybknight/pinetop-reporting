const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../shared/middleware/mustBeLoggedIn');
const phidget22 = require('phidget22');

let serverPotStatus = false;
let isPotAllowedToRun = true;


function getCurrentUser(req, res) {
  // I'm picking only the specific fields its OK for the audience to see publicly
  // never send the whole user object in the response, and only show things it's OK
  // for others to read (like ID, name, email address, etc.)
  const { id, username, fullName } = req.user;
  res.json({
    id, username, fullName
  });
}

router.route('/auth')
  // GET to /api/auth will return current logged in user info
  .get((req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'You are not currently logged in.'
      })
    }

    getCurrentUser(req, res);
  })
  // POST to /api/auth with username and password will authenticate the user
  .post(passport.authenticate('local'), (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      })
    }

    getCurrentUser(req, res);
  })
  // DELETE to /api/auth will log the user out
  .delete((req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'You have been logged out.'
    });
  });

router.route('/users')
  // POST to /api/users will create a new user
  .post((req, res, next) => {
    db.User.create(req.body)
      .then(user => {
        const { id, username, fullName } = user;
        res.json({
          id, username, fullName
        });
      })
      .catch(err => {
        // if this error code is thrown, that means the username already exists.
        // let's handle that nicely by redirecting them back to the create screen
        // with that flash message
        if (err.code === 11000) {
          res.status(400).json({
            message: 'Username already in use.'
          })
        }

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });

// this route is just returns an array of strings if the user is logged in
// to demonstrate that we can ensure a user must be logged in to use a route
router.route('/stuff')
  .get(mustBeLoggedIn(), (req, res) => {
    // at this point we can assume the user is logged in. if not, the mustBeLoggedIn middleware would have caught it
    res.json([
      'here',
      'is',
      'my',
      'list'
    ]);
  });

router.route('/setpot')
  .post((req,res) => {
    console.log('got the request')
    console.log(`front end asked for ${req.body.desiredPotState}`);
    serverPotStatus = req.body.desiredPotState
    console.log(`the server set the status to ${serverPotStatus} in the /setpot post request`);
    flashingLights.runDemo();
    res.json({
      serverPotStatus:serverPotStatus
    });
  })

router.route('/potstatus')
  .get((req,res) => {
    console.log('front end asked what is the pot status')
    console.log(`server status is ${serverPotStatus}`);
    res.json({
      serverPotStatus:serverPotStatus
    });
  })


// Phidget Programs -- need to move to own module
const flashingLights = {
  runDemo: function() {
      console.log(`phidget code was called`);
      var SERVER_PORT = 5661;
      hostname = '127.0.0.1';
      var conn = new phidget22.Connection(SERVER_PORT, hostname, { name: 'Server Connection', passwd: '' });
      conn.connect()
          .then(this.startThePhidgetProgram)
          .catch(function (err) {
              console.error('Error running example:', err.message);
              process.exit(1);
          });
  },
  startThePhidgetProgram: function() {
    var digitalOutput = new phidget22.DigitalOutput();
    digitalOutput.open()
      .then(() => {
        console.log('in the block');
        console.log(digitalOutput.getState());
        var lcdDisplay = new phidget22.LCD();
        lcdDisplay.open()
        .then(() => {
          
          let screenSize = lcdDisplay.getWidth();
          console.log(`width is ${screenSize}`);
          if (lcdDisplay.getDeviceID() === phidget22.DeviceID.PN_1204)
            lcdDisplay.setScreenSize(phidget22.LCDScreenSize.DIMENSIONS_2X40);
          lcdDisplay.setBacklight(1);
          lcdDisplay.writeText(phidget22.LCDFont.DIMENSIONS_5X8, 0, 0, "Two Lines!");
          lcdDisplay.writeText(phidget22.LCDFont.DIMENSIONS_5X8, 0, 1, "Phidgets");
          lcdDisplay.flush();
          
          var exTimer;

	        function updateState() {
            var newState = !digitalOutput.getState();
            console.log('\nSetting state to ' + newState + ' for 5 seconds...');
            digitalOutput.setState(newState);
            let message = `output is ${!newState}`;
            lcdDisplay.clear();
            lcdDisplay.writeText(phidget22.LCDFont.DIMENSIONS_5X8, 0, 0, message);
            lcdDisplay.flush();
          }
          
          exTimer = setInterval(function () { updateState() }, 5000);
        })
        .catch(function (err) {
          console.error('Error running example:', err.message);
          process.exit(1);
        });
      })
      .catch(function (err) {
        console.error('Error running example:', err.message);
        process.exit(1);
      });
  }
}

module.exports = router;

