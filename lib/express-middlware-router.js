var	async = require('async'),
	path = require('path'),
	
	Route = require(path.join(__dirname, '/models/route'));

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

exports.initialize = function(app, controllers_path, callback) {
	async.waterfall([
		function(next) {
			Route.find(next);
		},
		function(result) {
			var	valid_routes = {},
				route,
				controller,
				name,
				i;

			
			for(i = result.length; i--;) {
				route = result[i];
				controller = require(path.join(controllers_path, route.controller));
				
				if(!controller[route.name]){

				}
				
				handler = controller[route.name];
				
				if(typeof(name) != 'undefined' && name) {
					app[route.type](route.path, name);
					
					if(typeof(valid_routes[route.type]) == 'undefined') {
						valid_routes[route.type] = [];
					}
					valid_routes[route.type].push(route)
				}
			}
			
			callback(false, valid_routes);
		}
	], callback);
};