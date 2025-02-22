const postModel = require('../models/post.model')

class PostService {
	async createPost(body, user) {
		const post = await postModel.create({ user: user.id, ...body })
		return post
	}

	async getPosts() {
		const posts = await postModel
			.find()
			.populate('author', 'firstName lastName photo username -_id')
		return posts
	}
}

module.exports = new PostService()
