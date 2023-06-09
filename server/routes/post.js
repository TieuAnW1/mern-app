const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require('../models/post');

/*
	@route POST api/post/create
	@desc Create new post
	@access Private
	@param {
		title: String,
		description: String,
		url: String,
		status: String,
	}
*/
router.post('/create', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body;
	if (!title)
		res.status(400).json({
			success: false,
			message: 'Title is required.',
		});

	try {
		const newPost = new Post({
			title,
			description,
			url,
			status: status || 'TO LEARN',
			user: req.userId,
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

/*
	@route POST api/post/get-posts
	@desc Get all posts of user
	@access Private
*/

router.get('/get-posts', verifyToken, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.userId }).populate('user', ['userName']);
		return res.json({
			success: true,
			message: 'Getting all posts was successfully.',
			posts: posts,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error.',
		});
	}
});

/*
	@route POST api/post/:id
	@desc Update post
	@access Private
	@param {
		title: String,
		description: String,
		url: String,
		status: String,
	}
*/
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body;
	if (!title)
		res.status(400).json({
			success: false,
			message: 'Title is required.',
		});

	try {
		let updatedPost = {
			title,
			description: description || '',
			url: url || '',
			status: status || 'TO LEARN',
		};

		const conditionOfUpdatingPost = { _id: req.params.id, user: req.userId };
		updatedPost = await Post.findOneAndUpdate(conditionOfUpdatingPost, updatedPost, { new: true });

		if (!updatedPost)
			return res.status(401).json({ success: false, message: 'Post not found or user not authorized.' });

		return res.json({
			success: true,
			message: 'Post was updated successfully.',
			post: updatedPost,
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
