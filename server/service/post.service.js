const postModel = require('../models/post.model')

class PostService {
	// @desc   Get all posts
	// @route  GET /api/v1/post/
	// @access Public
	async getPosts() {
		const posts = await postModel
			.find()
			.populate('author', 'firstName lastName photo username -_id')
		return posts
	}

	// @desc   Get post by id
	// @route  GET /api/v1/post/:id
	// @access Public
	async getPost(id) {
		const post = await postModel
			.findById(id)
			.populate('author', 'firstName lastName photo username -_id')
			.populate('category', 'name -_id')
		return post
	}

	// @desc   Get latest post
	// @route  GET /api/v1/post/lastone
	// @access Public
	async getLatestPost() {
		const post = await postModel
			.findOne()
			.sort({ createdAt: -1 })
			.populate('author', 'firstName lastName photo username -_id')
			.populate('category', 'name -_id')
		return post
	}

	// @desc   Get latest posts
	// @route  GET /api/v1/post/lastones
	// @access Public
	async getLatestPosts() {
		const posts = await postModel
			.find()
			.sort({ createdAt: -1 })
			.limit(5)
			.populate('author', 'firstName lastName photo username -_id')
			.populate('category', 'name -_id')
		return posts
	}

	// @desc   Create post
	// @route  POST /api/v1/post/
	// @access Private
	async createPost(body, user) {
		const post = await postModel.create({ user: user.id, ...body })
		return post
	}

	// @desc   Update post
	// @route  PUT /api/v1/post/:id
	// @access Private / only for author
	async updatePost(id, body, user) {
		const post = await postModel.findById(id)
		if (!post) {
			return null
		}
		await post.updateOne(body)
	}

	// @desc   Delete post
	// @route  DELETE /api/v1/post/:id
	// @access Private / only for author
	async deletePost(id) {
		const post = await postModel.findByIdAndDelete(id)
		if (!post) {
			return null
		}
		return post
	}

	// @desc   Delete post image
	// @route  DELETE /api/v1/post/delete-image/:id
	// @access Private
	async deleteImage(id) {
		const post = await postModel.findById(id)
		if (!post) {
			return null
		}
		await post.updateOne({
			$unset: {
				photo: '',
			},
		})
		return post
	}
}

module.exports = new PostService()
