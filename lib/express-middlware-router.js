var	async = require('async'),
	path = require('path'),
	
	route = require(path.join(__dirname, '/models/route'));

exports.awesome = function() {
	return 'awesome';
};

exports.add_route = function(data) {
	
};

exports.get_route = function(route_id) {
	async.waterfall([
		function(next) {
			route.findById(route_id, next);
		},
		function(route) {
			console.log(route);
		}
	],
	function (err) {
		console.log(err);
	});
};

exports.delete_route = function(route_id, callback) {
	async.waterfall([
		function(next) {
			route.findById(route_id, next);
		},
		function(route) {
			route.remove(next);
		},
		function(route) {
			console.log(route);
		}
	],
	function (err) {
		console.log(err);
	});
};

exports.get_route_list = function(limit, offset, callback) {
	async.waterfall([
		function() {
			var options = {};
			
			if(limit) {
				options.limit = limit;
			}
			
			if(offset) {
				options.skip = offset;
			}
			
			route.find({}, options, callback);
		}
	],
	function (err) {
		console.log(err);
	});
};

exports.update_route = function(route_id, data) {
	
};

exports.init_route = function() {
	
};