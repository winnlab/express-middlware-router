mongoose = require 'mongoose'
ObjectId = mongoose.Schema.Types.ObjectId
Mixed = mongoose.Schema.Types.Mixed

database = require '../../init/database'

schema = new mongoose.Schema 
	type:
		type: String
		required: true
		unique: false 
	path:
		type: String
		required: true
		unique: true 
	controller:
		type: String
		required: true
		unique: false 
	name:
		type: String
		required: true
		unique: true 
,
	collection: 'idk'



module.exports = mongoose.model 'Route', schema
