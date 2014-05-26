var	should = require('should'),
	async = require('async'),
	crypto = require('crypto'),
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

describe('expressMiddlwareRouter should have #addRoute as function.', function() {
	it('should have #addRoute', function() {
		expressMiddlwareRouter.should.be.have.property('addRoute');
	});
	
	it('#addRoute should have be a function', function() {
		expressMiddlwareRouter.addRoute.should.be.a.Function;
	});
	
	it('#addRoute should add a route to database', function() {
		var	r1 = {
			type: 'get',
			path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
			controller: 'test',
			name: 'test'
		}, r2 = {
			type: 'get',
			path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
			controller: 'test',
			name: 'test'
		};
		
		async.parallel({
			first: function(next) {
				expressMiddlwareRouter.addRoute(r1, next);
			},
			second: function(next) {
				route.create(r2, next);
			}
		}, function(err, results) {
			var	first = results.first,
				second = results.second;
			
			first.type.should.equal(second.type);
			first.controller.should.equal(second.controller);
			first.name.should.equal(second.name);
			
			first.remove();
			second.remove();
		});
	});
});

describe('expressMiddlwareRouter should have #getRoute as function.', function() {
	it('should have #getRoute', function() {
		expressMiddlwareRouter.should.be.have.property('getRoute');
	});
	
	it('#getRoute should have be a function', function() {
		expressMiddlwareRouter.getRoute.should.be.a.Function;
	});
	
	it('#getRoute should get a route from database', function() {
		var data = {
			type: 'get',
			path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
			controller: 'test',
			name: 'test'
		};
		
		async.waterfall([
			function(next) {
				route.create(data, next);
			},
			function(new_route) {
				async.parallel({
					first: function(next) {
						expressMiddlwareRouter.getRoute(new_route._id, next);
					},
					second: function(next) {
						route.findById(new_route._id, next);
					}
				}, function(err, results) {
					var	first = results.first,
						second = results.second;
					
					JSON.stringify(first).should.equal(JSON.stringify(second));
					
					new_route.remove();
				});
			}
		],
		function(err) {
			console.log(err);
		});
	});
});

describe('expressMiddlwareRouter should have #deleteRoute as function.', function() {
	it('should have #deleteRoute', function() {
		expressMiddlwareRouter.should.be.have.property('deleteRoute');
	});
	
	it('#deleteRoute should have be a function', function() {
		expressMiddlwareRouter.deleteRoute.should.be.a.Function;
	});
	
	it('#deleteRoute should delete a route from database', function() {
		async.waterfall([
			function(next) {
				var data = {
					type: 'get',
					path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
					controller: 'test',
					name: 'test'
				};
				
				route.create(data, next);
			},
			function(new_route, next) {
				expressMiddlwareRouter.deleteRoute(new_route._id, next);
			},
			function(deleted_route, next) {
				route.findById(deleted_route._id, next);
			},
			function(nonexistent_route) {
				(nonexistent_route === null).should.be.true;
			}
		],
		function(err) {
			console.log(err);
		});
	});
});

describe('expressMiddlwareRouter should have #getRouteList as function.', function() {
	it('should have #getRouteList', function() {
		expressMiddlwareRouter.should.be.have.property('getRouteList');
	});
	
	it('#getRouteList should have be a function', function() {
		expressMiddlwareRouter.getRouteList.should.be.a.Function;
	});
	
	it('#getRouteList should get an array of routes from database', function() {
		var limit = 5,
			offset = 1;
		
		async.parallel({
			first: function(next) {
				expressMiddlwareRouter.getRouteList(limit, offset, next);
			},
			second: function(next) {
				var	options = {
					lean: true,
					limit: limit,
					skip: offset
				}
				route.find({}, options, next);
			}
		}, function(err, results) {
			var	first = results.first,
				second = results.second,
				i;
			
			first.length.should.equal(second.length);
			
			for(i = first.length; i--;) {
				JSON.stringify(first[i]).should.equal(JSON.stringify(second[i]));
			}
		});
	});
});

describe('expressMiddlwareRouter should have #updateRoute as function.', function() {
	it('should have #updateRoute', function() {
		expressMiddlwareRouter.should.be.have.property('updateRoute');
	});
	
	it('#updateRoute should have be a function', function() {
		expressMiddlwareRouter.updateRoute.should.be.a.Function;
	});
	
	it('#updateRoute should update a route from database', function() {
		var data = {
			type: 'get',
			path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
			controller: 'test',
			name: 'test'
		},
		new_data = {
			type: 'post',
			controller: 'new_test',
			name: 'new_test'
		},
		updated_route;
		
		async.waterfall([
			function(next) {
				route.create(data, next);
			},
			function(new_route, next) {
				updated_route = new_route;
				expressMiddlwareRouter.updateRoute(new_route._id, new_data, next);
			}, function(numberAffected, raw) {
				numberAffected.should.equal(1);
				raw.updatedExisting.should.equal(true);
				(raw.err === null).should.be.true;
				
				updated_route.remove();
			}
		],
		function(err) {
			console.log(err);
		});
	});
});

describe('expressMiddlwareRouter should have #initRoute as function.', function() {
	it('should have #initRoute', function() {
		expressMiddlwareRouter.should.be.have.property('initRoute');
	});
	
	it('#initRoute should have be a function', function() {
		expressMiddlwareRouter.initRoute.should.be.a.Function;
	});
});