const postModel = require('../models/post.model')

class PostService {
	// @desc   Create post
	// @route  POST /api/v1/post/
	// @access Private
	async createPost(body, user) {
		const post = await postModel.create({ user: user.id, ...body })
		return post
	}

	// @desc   Get all posts
	// @route  GET /api/v1/post/
	// @access Public
	async getPosts() {
		const posts = await postModel
			.find()
			.populate('author', 'firstName lastName photo username -_id')
		return posts
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
	}
}

module.exports = new PostService()
