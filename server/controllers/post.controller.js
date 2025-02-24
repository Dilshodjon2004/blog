const postService = require('../service/post.service')

class PostController {
	// @desc   Get all posts
	// @route  GET /api/v1/post/
	// @access Public
	async getPosts(req, res, next) {
		try {
			const posts = await postService.getPosts()
			res.status(200).json(res.advancedResults)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get post by id
	// @route  GET /api/v1/post/:id
	// @access Public
	async getPost(req, res, next) {
		try {
			const post = await postService.getPost(req.params.id)
			if (!post) {
				return res.status(404).json({ message: 'Post not found' })
			}
			res.status(200).json(post)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get latest post
	// @route  GET /api/v1/post/lastone
	// @access Public
	async getLatestPost(req, res, next) {
		try {
			const post = await postService.getLatestPost()
			res.status(200).json(post)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get latest posts
	// @route  GET /api/v1/post/lastones
	// @access Public
	async getLatestPosts(req, res, next) {
		try {
			const posts = await postService.getLatestPosts()
			res.status(200).json(posts)
		} catch (error) {
			next(error)
		}
	}

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

	// @desc   Get comments
	// @route  GET /api/v1/post/comment/:id
	// @access Public
	async getComments(req, res, next) {
		try {
			const comments = await postService.getComments(req.params.id)
			res.status(200).json(comments)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Update post
	// @route  PUT /api/v1/post/:id
	// @access Private / only for author
	async updatePost(req, res, next) {
		try {
			await postService.updatePost(req.params.id, req.body, req.user)
			return res.status(200).json({ message: 'Post updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	// @desc   Delete post
	// @route  DELETE /api/v1/post/:id
	// @access Private / only for author
	async deletePost(req, res, next) {
		try {
			const post = await postService.deletePost(req.params.id)
			if (!post) {
				return res.status(404).json({ message: 'Post not found' })
			}
			res.status(200).json({ message: 'Post deleted successfully' })
		} catch (error) {
			next(error)
		}
	}

	// @desc   Delete post image
	// @route  DELETE /api/v1/post/delete-image/:id
	// @access Private
	async deleteImage(req, res, next) {
		try {
			const post = await postService.deleteImage(req.params.id)
			if (!post) {
				return res.status(404).json({ message: 'Post not found' })
			}
			res.status(200).json({ message: 'Image deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new PostController()
