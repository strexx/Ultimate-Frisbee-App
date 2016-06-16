/**
 * Get unique keys in arrays
 * Source: https://gist.github.com/jed/1044540
 */

var uniqueKeys = function() {
	Array.prototype.unique = function(a) {
        return function() {
            return this.filter(a)
        }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });
};

module.exports = uniqueKeys;
