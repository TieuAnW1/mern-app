const express = require('express');
const router = express.Router();
const User = require('../models/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

//  @route POST api/auth/register
//  @des Register user
//  @access Public
//  @body {userName: String, password: String}

router.post('/register', async (req, res) => {
	const { userName, password } = req.body;

	// Validation
	if (!userName || !password)
		res.status(400).json({
			success: false,
			message: 'Missing username or/and password.',
		});

	try {
		const isExistingUser = await User.findOne({ userName });
		if (isExistingUser)
			res.status(400).json({
				success: false,
				message: 'Username already taken.',
			});

		const hashedPassword = await argon2.hash(password);
		const newUser = new User({ userName, password: hashedPassword });
		await newUser.save();

		const accessToken = jwt.sign(
			{
				userId: newUser._id,
			},
			process.env.ACCESS_TOKEN_SECRET,
		);

		return res.json({ success: true, message: 'User created successfully.', accessToken });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error.',
		});
	}
});

module.exports = router;
