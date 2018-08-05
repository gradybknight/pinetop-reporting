const phidget22 = require('phidget22');

exports.flashingLights = {
  runDemo: function (desiredStatus, serverStatus) {
      console.log(`phidget code was called`);
      var SERVER_PORT = 5661;
      hostname = '127.0.0.1';
      var conn = new phidget22.Connection(SERVER_PORT, hostname, { name: 'Server Connection', passwd: '' });
      conn.connect()
          .then(this.updateState)
          .catch(function (err) {
              console.error('Error running example:', err.message);
              process.exit(1);
          });
  },
  updateState: function() {
    var digitalOutput = new phidget22.DigitalOutput();
    digitalOutput.open()
      .then(() => {
        console.log('in the block');
        console.log(digitalOutput.getState());
      })
      .catch(function (err) {
        console.error('Error running example:', err.message);
        process.exit(1);
      });
    
    
  }
}