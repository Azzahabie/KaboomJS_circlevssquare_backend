var pg = require('pg');
var client = new pg.Client(");

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
});

module.exports = client;
