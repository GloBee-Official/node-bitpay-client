var fs         = require('fs');
var async      = require('async');
var KeyUtils   = require('../lib/key-utils');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bp/api.key').toString();
var config     = require('../config');
var privkey    = KeyUtils.decrypt(config.keyPassword, encPrivkey);
var client     = new BitPay(privkey);

if (process.argv.length < 3) {
  console.log('usage: get-payout-request.js [payoutId]');
  return;
}
client.on('ready', function() {

  client.as('payroll').get('payouts/' + process.argv[2], { status: 'new' }, function(err, requests) {
    console.log(err || requests);
  });

});




