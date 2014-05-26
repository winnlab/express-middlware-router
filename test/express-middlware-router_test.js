var	should = require('should'),
	async = require('async'),
	_ = require('underscore'),
	
	expressMiddlwareRouter = require('../lib/express-middlware-router.js'),
	route = require('../lib/models/route');

describe('expressMiddlwareRouter should have #awesome as function.', function() {
	it('should have #awesome', function() {
		expressMiddlwareRouter.should.be.have.property('awesome');
	});
	
	it('#awesome should have be a function', function() {
		expressMiddlwareRouter.awesome.should.be.a.Function;
	});
	
	it('#awesome should return "awesome"', function() {
		expressMiddlwareRouter.awesome().should.be.exactly("awesome")
	});
});

describe('expressMiddlwareRouter should have #add_route as function.', function() {
	it('should have #add_route', function() {
		expressMiddlwareRouter.should.be.have.property('add_route');
	});
	
	it('#add_route should have be a function', function() {
		expressMiddlwareRouter.add_route.should.be.a.Function;
	});
});

describe('expressMiddlwareRouter should have #get_route as function.', function() {
	it('should have #get_route', function() {
		expressMiddlwareRouter.should.be.have.property('get_route');
	});
	
	it('#get_route should have be a function', function() {
		expressMiddlwareRouter.get_route.should.be.a.Function;
	});
});

describe('expressMiddlwareRouter should have #delete_route as function.', function() {
	it('should have #delete_route', function() {
		expressMiddlwareRouter.should.be.have.property('delete_route');
	});
	
	it('#delete_route should have be a function', function() {
		expressMiddlwareRouter.delete_route.should.be.a.Function;
	});
});

describe('expressMiddlwareRouter should have #get_route_list as function.', function() {
	it('should have #get_route_list', function() {
		expressMiddlwareRouter.should.be.have.property('get_route_list');
	});
	
	it('#get_route_list should have be a function', function() {
		expressMiddlwareRouter.get_route_list.should.be.a.Function;
	});
	
	it('#get_route_list should get an array of routes from database', function() {
		var limit = 5,
			offset = 1;
		
		async.parallel({
			first: function(next) {
				expressMiddlwareRouter.get_route_list(limit, offset, next);
			},
			second: function(next) {
				var	options = {
					limit: limit,
					skip: offset
				}
				route.find({}, options, next);
			}
		}, function(err, results) {
			var	first = results.first,
				second = results.second;
			
			_.difference(first, second).length.should.equal(0);
		});
	});
});

describe('expressMiddlwareRouter should have #update_route as function.', function() {
	it('should have #update_route', function() {
		expressMiddlwareRouter.should.be.have.property('update_route');
	});
	
	it('#update_route should have be a function', function() {
		expressMiddlwareRouter.update_route.should.be.a.Function;
	});
});

describe('expressMiddlwareRouter should have #init_route as function.', function() {
	it('should have #init_route', function() {
		expressMiddlwareRouter.should.be.have.property('init_route');
	});
	
	it('#init_route should have be a function', function() {
		expressMiddlwareRouter.init_route.should.be.a.Function;
	});
});