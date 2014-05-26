var	async = require('async'),
	path = require('path'),
	
	route = require(path.join(__dirname, '/models/route'));

exports.awesome = function() {
	return 'awesome';
};

exports.addRoute = function(data, callback) {
	async.waterfall([
		function() {
			route.create(data, callback);
		}
	],
	function(err) {
		console.log(err);
	});
};

exports.getRoute = function(route_id, callback) {
	async.waterfall([
		function() {
			route.findById(route_id, callback);
		}
	],
	function(err) {
		console.log(err);
	});
};

exports.deleteRoute = function(route_id, callback) {
	async.waterfall([
		function(next) {
			route.findById(route_id, next);
		},
		function(route) {
			route.remove(callback);
		}
	],
	function(err) {
		console.log(err);
	});
};

exports.getRouteList = function(limit, offset, callback) {
	async.waterfall([
		function() {
			var options = {
				lean: true
			};
			
			if(limit) {
				options.limit = limit;
			}
			
			if(offset) {
				options.skip = offset;
			}
			
			route.find({}, options, callback);
		}
	],
	function(err) {
		console.log(err);
	});
};

exports.updateRoute = function(route_id, data, callback) {
	async.waterfall([
		function() {
			route.update({_id: route_id}, data, callback);
		}
	],
	function(err) {
		console.log(err);
	});
};

exports.initRoute = function() {
	
};