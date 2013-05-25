node-bitcoincharts
=====

An unofficial node.js client for the [bitcoin charts markets api](http://bitcoincharts.com/about/markets-api/).

## Installation

node-bitcoincharts is available as `bitcoincharts` on npm.

```
npm install bitcoincharts
```

## Usage

```javascript
var BitcoinCharts = require('bitcoincharts'),
    bitcoinCharts = new BitcoinCharts();

bitcoinCharts.weightedPrices(function(err, data) {
  if (err) {
    throw err;
  }

  console.log(data);
});

bitcoinCharts.markets(function(err, data) {
  if (err) {
    throw err;
  }

  console.log(data);
});

bitcoinCharts.trades({ "symbol": "mtgoxUSD", "start": 1365670800, "end": 1365670860 }, function(err, data) {
  if (err) {
    throw err;
  }

  console.log(data);
}); 
```

## License

This module is [ISC licensed](https://github.com/pskupinski/node-bitcoincharts/blob/master/LICENSE.txt).
