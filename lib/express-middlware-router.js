var	async = require('async'),
	path = require('path'),
	
	route = require(path.join(__dirname, '/models/route'));

exports.awesome = function() {
	return 'awesome';
};

exports.add_route = function(data) {
	
};

exports.get_route = function(route_id) {
	
};

exports.delete_route = function(route_id) {
	
};

exports.get_route_list = function(limit, offset) {
	async.waterfall([
		function(next) {
			var options = {};
			
			if(limit) {
				options.limit = limit;
			}
			
			if(offset) {
				options.skip = offset;
			}
			
			route.get({}, options, next);
		},
		function(routes) {
			console.log(routes);
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