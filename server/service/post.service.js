const postModel = require('../models/post.model')

class PostService {
	async createPost(body, user) {
		const post = await postModel.create({ user: user.id, ...body })
		return post
	}

	async getPosts() {
		const posts = await postModel.find().populate('user', 'firstName lastName -_id')
		return posts
	}
}

module.exports = new PostService()
