var	should = require('should'),
	async = require('async'),
	crypto = require('crypto'),
	_ = require('underscore'),
	mongoose = require('mongoose'),
	
	expressMiddlwareRouter = require('../lib/express-middlware-router.js'),
	Route = require('../lib/models/route');

describe('expressMiddlwareRouter should have #get as function.', function() {
	it('should have #get', function() {
		expressMiddlwareRouter.should.be.have.property('get');
	});
	
	it('#get should have be a function', function() {
		expressMiddlwareRouter.get.should.be.a.Function;
	});
	
	it('#get should get a route from database', function() {
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
				});
			}
		],
		function(err) {
			console.log(err);
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
	
	it('#getList should get an array of routes from database', function() {
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
		});
	});
});