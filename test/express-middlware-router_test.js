var	should = require('should'),
	async = require('async'),
	crypto = require('crypto'),
	express = require('express'),
	path = require('path'),
	
	expressMiddlwareRouter = require('../lib/express-middlware-router.js'),
	Route = require('../lib/models/route');

describe('expressMiddlwareRouter should have #get as function.', function() {
	it('should have #get', function() {
		expressMiddlwareRouter.should.be.have.property('get');
	});
	
	it('#get should have be a function', function() {
		expressMiddlwareRouter.get.should.be.a.Function;
	});
	
	it('#get should get a route from database', function(done) {
		var data = {
			type: 'get',
			path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
			controller: 'test',
			name: 'test'
		};
		
		async.waterfall([
			function(next) {
				Route.create(data, next);
			},
			function(route) {
				async.parallel({
					first: function(next) {
						expressMiddlwareRouter.get(route._id, next);
					},
					second: function(next) {
						Route.findById(route._id, next);
					}
				}, function(err, results) {
					var	first = results.first,
						second = results.second;
					
					JSON.stringify(first).should.equal(JSON.stringify(second));
					
					route.remove();
					done();
				});
			}
		],
		function(err) {
			console.log(err);
			done();
		});
	});
});

describe('expressMiddlwareRouter should have #getList as function.', function() {
	it('should have #getList', function() {
		expressMiddlwareRouter.should.be.have.property('getList');
	});
	
	it('#getList should have be a function', function() {
		expressMiddlwareRouter.getList.should.be.a.Function;
	});
	
	it('#getList should get an array of routes from database', function(done) {
		var limit = 5,
			offset = 1;
		
		async.parallel({
			first: function(next) {
				expressMiddlwareRouter.getList(limit, offset, next);
			},
			second: function(next) {
				var	options = {
					lean: true,
					limit: limit,
					skip: offset
				};
				
				Route.find({}, options, next);
			}
		}, function(err, results) {
			var	first = results.first,
				second = results.second,
				i;
			
			first.length.should.equal(second.length);
			
			for(i = first.length; i--;) {
				JSON.stringify(first[i]).should.equal(JSON.stringify(second[i]));
			}
			
			done();
		});
	});
});

describe('expressMiddlwareRouter should have #add as function.', function() {
	it('should have #add', function() {
		expressMiddlwareRouter.should.be.have.property('add');
	});
	
	it('#add should have be a function', function() {
		expressMiddlwareRouter.add.should.be.a.Function;
	});
	
	it('#add should add a route to database', function(done) {
		var	r1 = {
			type: 'get',
			path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
			controller: 'test_add',
			name: 'test_add'
		}, r2 = {
			type: 'get',
			path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
			controller: 'test_add',
			name: 'test_add'
		};
		
		async.parallel({
			first: function(next) {
				expressMiddlwareRouter.add(r1, next);
			},
			second: function(next) {
				Route.create(r2, next);
			}
		}, function(err, results) {
			var	first = results.first,
				second = results.second;
			
			first.type.should.equal(second.type);
			first.controller.should.equal(second.controller);
			first.name.should.equal(second.name);
			
			first.remove();
			second.remove();
			
			done();
		});
	});
});

describe('expressMiddlwareRouter should have #remove as function.', function() {
	it('should have #remove', function() {
		expressMiddlwareRouter.should.be.have.property('remove');
	});
	
	it('#remove should have be a function', function() {
		expressMiddlwareRouter.remove.should.be.a.Function;
	});
	
	it('#remove should delete a route from database', function(done) {
		async.waterfall([
			function(next) {
				var data = {
					type: 'get',
					path: crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
					controller: 'test_delete',
					name: 'test_delete'
				};
				
				Route.create(data, next);
			},
			function(route, next) {
				expressMiddlwareRouter.remove(route._id, next);
			},
			function(deleted_route, next) {
				Route.findById(deleted_route._id, next);
			},
			function(nonexistent_route) {
				(nonexistent_route === null).should.be.true;
				done();
			}
		],
		function(err) {
			console.log(err);
			done();
		});
	});
});

describe('expressMiddlwareRouter should have #update as function.', function() {
	it('should have #update', function() {
		expressMiddlwareRouter.should.be.have.property('update');
	});
	
	it('#update should have be a function', function() {
		expressMiddlwareRouter.update.should.be.a.Function;
	});
	
	it('#update should update a route from database', function(done) {
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
		route;
		
		async.waterfall([
			function(next) {
				Route.create(data, next);
			},
			function(new_route, next) {
				route = new_route;
				expressMiddlwareRouter.update(new_route._id, new_data, next);
			}, function(numberAffected, raw) {
				numberAffected.should.equal(1);
				raw.updatedExisting.should.equal(true);
				(raw.err === null).should.be.true;
				
				route.remove();
				done();
			}
		],
		function(err) {
			console.log(err);
			done();
		});
	});
});

describe('expressMiddlwareRouter should have #initialize as function.', function() {
	it('should have #update', function() {
		expressMiddlwareRouter.should.be.have.property('initialize');
	});
	
	it('#initialize should have be a function', function() {
		expressMiddlwareRouter.initialize.should.be.a.Function;
	});
	
	it('#initialize should initialize routes from database', function(done) {
		var	app = express(),
			controllers_path = path.join(__dirname, 'controllers');
		
		async.parallel({
			first: function(next) {
				expressMiddlwareRouter.initialize(app, controllers_path, next);
			},
			second: function(next) {
				async.waterfall([
					function(next2) {
						Route.find({}, next2);
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
							
							if(typeof(controller) != 'undefined' && controller) {
								name = controller[route.name];
								
								if(typeof(name) != 'undefined' && name) {
									app[route.type](route.path, name);
									
									if(typeof(valid_routes[route.type]) == 'undefined') {
										valid_routes[route.type] = [];
									}
									valid_routes[route.type].push(route)
								}
							}
						}
						
						next(false, valid_routes);
					}
				],
				function(err) {
					console.log(err);
				});
			}
		}, function(err, results) {
			var	first = results.first,
				second = results.second;
			
			JSON.stringify(first).should.equal(JSON.stringify(second));
			
			done();
		});
	});
});