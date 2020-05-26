const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	titleSearch: {
		type: String,
		lowercase: true
	},
	url: {
		type: String,
		lowercase: true
	},
	description: String,
	code: String,
	demo: String,
	created: {
		type: Date,
		default: Date.now
	},
	projectImg: {
		type: String,
		default: 'none'
	},
	imageName: String
});

module.exports = mongoose.model('project', projectSchema);
