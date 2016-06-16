/**
 * Always show two digits
 * Source: http://www.electrictoolbox.com/pad-number-two-digits-javascript/
 */

var formatDigits = function(number) {
	return (number < 10 ? '0' : '') + number
 }

module.exports = formatDigits;
