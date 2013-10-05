var request = require("request"),
    querystring = require("querystring"),
    CSV = require("csv-string");

/**
 * The client for bitcoincharts.com API.
 *
 * @constructor
 */
var BitcoinCharts = function() {
  this.url = "http://api.bitcoincharts.com/v1/";
};

/**
 * Private helper method for making API requests.
 *
 * @param {string} baseUrl The base URL for the request.
 * @param {string} method The API endpoint the request will call.
 * @param {!Object} params The query parameters to use for the request.
 * @param {function(string)} parserLambda The function to use for parsing the response into an easy to use format.
 * @param {function(Error, Object)} callback The callback to call with an error or the result.

 */
var makeRequest = function(baseUrl, method, params, parserLambda, callback) {
  var queryString = querystring.stringify(params),
      url = baseUrl + method;

  if (queryString) {
    url += "?" + queryString;
  }

  request(url, function(err, response, body) {
    if(err || response.statusCode !== 200) {
      return callback(new Error(err ? err : response.statusCode));
    }

    if(!body) {
      return callback(new Error('Bitcoincharts responded without any data'));
    }

    var result;
    try {
      result = parserLambda(body);
    } catch(error) {
      return callback(new Error(error));
    }

    callback(null, result);
  });
};

/**
 * Call the 'weighted_prices.json' endpoint of the API.
 *
 * @param {function(Error, Object)} callback The callback to call with an error or the result.
 */

BitcoinCharts.prototype.weightedPrices = function(callback) {
  makeRequest(this.url, "weighted_prices.json", {}, JSON.parse, callback);
};

/**
 * Call the 'markets.json' endpoint of the API.
 *
 * @param {function(Error, Object)} callback The callback to call with an error or the result.
 */
BitcoinCharts.prototype.markets = function(callback) {
  makeRequest(this.url, "markets.json", {}, JSON.parse, callback);
};

/**
 * Call the 'trades.csv' endpoint of the API.
 *
 * @param {!Object} params An object containing at least the 'symbol' to use and optional an 'end' time.
 * @param {function(Error, Array)} callback The callback to call with an error or the result.
 */
BitcoinCharts.prototype.trades = function(params, callback) {
  makeRequest(this.url, "trades.csv", params, CSV.parse, callback);
};

module.exports = BitcoinCharts;
