var	async = require('async'),
	path = require('path'),
	
	route = require(path.join(__dirname, '/models/route'));

exports.awesome = function() {
	return 'awesome';
};

exports.add_route = function() {
	
};

exports.get_route = function() {
	
};

exports.delete_route = function() {
	
};

exports.get_route_list = function() {
	async.waterfall([
		function(next) {
			route.find(next);
		},
		function(routes) {
			console.log(routes);
		}
	],
	function (err) {
		console.log(err);
	});
};

exports.update_route = function() {
	
};

exports.init_route = function() {
	
};