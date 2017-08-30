# Using GloBee with Node.js

## Prerequisites
You must have a GloBee merchant account to use this library.  It's free to [sign-up for a GloBee merchant account](https://globee.com/register).

Once you have a GloBee merchant account, you will need [a working GloBee Access Token](/api-docs#getting-access) – this can be done either [via the library](#pairing) or manually in [the GloBee Dashboard](https://globee.com/tokens).

## Node.js Quick Start

Using GloBee with your Node.js project is extremely simple.  Once you've [registered a GloBee account][bitpay registration], install the `globee` project via <abbr title="node package manager" class="tooltipped">npm</abbr>:

```bash
$ cd <your project folder>
$ npm install globee --save
```
You'll notice that we've added the `--save` parameter to automatically save the GloBee library to your `package.json` file.

Now, in your Node application, creating an Invoice is as simple as follows:

### Creating An Invoice

```javascript
var BitPay  = require('bitpay');
var privkey = fs.readFileSync('path/to/private.key');
var bitpay  = BitPay.createClient( privkey );

bitpay.on('ready', function() {
  bitpay.post('invoices', function(err, invoice) {
    console.log(err || invoice);
  });
});

```
You will receive either an `err` if any error took place, or an `invoice` if the invoice was successfully created.

### Issuing A Refund
Every Invoice on GloBee has a "refunds" subcollection.  To create a refund request, POST into it:

```javascript
bitpay.post('invoices/:invoiceID/:refunds', function(err, refundRequest) {
  
});
```

### Create a Recurring Bill
```javascript
bitpay.post('subscriptions', {
  billData: {/*...*/},// type: Bill.  See the Bill Schema.
  schedule: 'monthly' // type: enumerable, ['weekly', 'monthly', 'quarterly', 'yearly']
})
```

Bill Schema: https://bitpay.com/api#resource-Bills


[bitpay registration]: https://bitpay.com/start
