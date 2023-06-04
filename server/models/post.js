const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
	},
	url: {
		type: String,
	},
	status: {
		type: String,
		enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
	},
	user: {
		type: schema.Types.ObjectId,
		ref: 'users',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('posts', postSchema);
