var	should = require('should'),
	async = require('async'),
	crypto = require('crypto'),
	_ = require('underscore'),
	mongoose = require('mongoose'),
	
	expressMiddlwareRouter = require('../lib/express-middlware-router.js'),
	Route = require('../lib/models/route');

describe('expressMiddlwareRouter should have #add as function.', function() {
	it('should have #add', function() {
		expressMiddlwareRouter.should.be.have.property('add');
	});
	
	it('#add should have be a function', function() {
		expressMiddlwareRouter.add.should.be.a.Function;
	});
	
	it('#add should add a route to database', function() {
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
	
	it('#remove should delete a route from database', function() {
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
			}
		],
		function(err) {
			console.log(err);
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
	
	it('#update should update a route from database', function() {
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
			}
		],
		function(err) {
			console.log(err);
		});
	});
});