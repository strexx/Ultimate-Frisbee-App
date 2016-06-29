/**
 * Get unique keys in arrays
 * Source: https://gist.github.com/jed/1044540
 */

var shortenTitle = function() {
	String.prototype.trunc = String.prototype.trunc || function(n){
	          return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
	};
};

module.exports = shortenTitle;
