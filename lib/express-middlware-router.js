var	async = require('async'),
	path = require('path'),
	
	image = require(path.join(__dirname, '/models/route'));

exports.awesome = function() {
  return 'awesome';
};