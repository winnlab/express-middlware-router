var	async = require('async'),
	path = require('path'),
	
	Route = require(path.join(__dirname, '/models/route'));

exports.awesome = function() {
	return 'awesome';
};

exports.add = function(data, callback) {
	async.waterfall([
		function() {
			Route.create(data, callback);
		}
	], callback);
};

exports.get = function(route_id, callback) {
	async.waterfall([
		function() {
			Route.findById(route_id, callback);
		}
	], callback);
};

exports.remove = function(route_id, callback) {
	async.waterfall([
		function(next) {
			Route.findById(route_id, next);
		},
		function(route) {
			route.remove(callback);
		}
	], callback);
};

exports.getList = function(limit, offset, callback) {
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
			
			Route.find({}, options, callback);
		}
	], callback);
};

exports.update = function(route_id, data, callback) {
	async.waterfall([
		function() {
			Route.update({_id: route_id}, data, callback);
		}
	], callback);
};

exports.initialize = function(app, path, callback) {
	
};