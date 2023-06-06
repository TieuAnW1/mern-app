const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require('../models/post');

router.post('/create', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body;
	if (!title)
		res.status(400).json({
			success: false,
			message: 'Title is required',
		});

	try {
		const newPost = new Post({
			title,
			description,
			url,
			status: status || 'TO LEARN',
			user: '647cbcc0996c2c57b8bcfe40',
		});

		await newPost.save();

		return res.json({
			success: true,
			message: 'Post was created successfully.',
			post: newPost,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error.',
		});
	}
});

module.exports = router;
