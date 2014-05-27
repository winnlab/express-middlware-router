var	should = require('should'),
	async = require('async'),
	crypto = require('crypto'),
	_ = require('underscore'),
	mongoose = require('mongoose'),
	
	expressMiddlwareRouter = require('../lib/express-middlware-router.js'),
	Route = require('../lib/models/route');

describe('expressMiddlwareRouter should have #initialize as function.', function() {
	it('should have #update', function() {
		expressMiddlwareRouter.should.be.have.property('initialize');
	});
	
	it('#initialize should have be a function', function() {
		expressMiddlwareRouter.initialize.should.be.a.Function;
	});
	
	it('#initialize should initialize routes from database', function() {
		async.waterfall([
			function(next) {
				Route.find({}, next);
			},
			function(result) {
				
			}
		],
		function(err) {
			console.log(err);
		});
	});
});