const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
	userName: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('users', userSchema);
