const postService = require('../service/post.service')

class PostController {
	async createPost(req, res, next) {
		try {
			const post = await postService.createPost(req.body, req.user)
			res.status(201).json(post)
		} catch (error) {
			next(error)
		}
	}

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
