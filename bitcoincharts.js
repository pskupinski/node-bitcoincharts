var request = require("request"),
    querystring = require("querystring"),
    CSV = require("csv-string");

var BitcoinCharts = function() {
  var self = this;
  self.url = "http://bitcoincharts.com/t/";

  self.makeRequest = function(method, params, parserLambda, callback) {
    var queryString = querystring.stringify(params),
        url = self.url + method;

    if (queryString) {
      url += "?" + queryString;
    }

    request(url, function(err, response, body) {
      if(err) {
        callback(err);
        return;
      }

      callback(false, parserLambda(body));
    });
  };

  self.weightedPrices = function(callback) {
    self.makeRequest("weighted_prices.json", {}, JSON.parse, callback);
  };

  self.markets = function(callback) {
    self.makeRequest("markets.json", {}, JSON.parse, callback);
  };

  self.trades = function(params, callback) {
    self.makeRequest("trades.csv", params, CSV.parse, callback);
  };
}

module.exports = BitcoinCharts;
