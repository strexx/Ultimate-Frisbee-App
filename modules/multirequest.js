/**
 * Handle multiple requests at once
 * @param urls [array]
 * @param callback [function]
 * @requires request module for node ( https://github.com/mikeal/request )
 */

var request = require('request');

var __request = function (urls, callback) {
	var results = {}, t = urls.length, c = 0,
		handler = function (error, response, body) {

			var url = response.request.uri.href;

			results[url] = { error: error, response: response, body: body };

			if (++c === urls.length) { callback(results); }

		};

	while (t--) { request(urls[t], handler); }
};

module.exports = __request;
