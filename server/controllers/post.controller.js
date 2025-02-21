const postService = require('../service/post.service')

class PostController {
	// @desc   Create post
	// @route  POST /api/v1/post/
	// @access Private
	async createPost(req, res, next) {
		try {
			const post = await postService.createPost(req.body, req.user)
			res.status(201).json(post)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get all posts
	// @route  GET /api/v1/post/
	// @access Public
	async getPosts(req, res, next) {
		try {
			const posts = await postService.getPosts()
			res.status(200).json(posts)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new PostController()
