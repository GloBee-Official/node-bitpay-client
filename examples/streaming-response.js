var fs         = require('fs');
var KeyUtils   = require('../lib/key-utils');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bp/api.key').toString();
var config     = require('../config');
var privkey    = KeyUtils.decrypt(config.keyPassword, encPrivkey);
var parser     = require('clarinet').createStream();
var client     = new BitPay(privkey);
var count      = 0;

parser.on('key', function(key) {
  if (key === 'id') {
    parser.once('value', function(val) {
      count++;
      console.log('Got invoice: ' + val);
    });
  }
});

parser.on('end', function() {
  console.log('Streamed ' + count + ' invoices!');
});

client.on('ready', function() {
  client.get('invoices').pipe(parser);
});
