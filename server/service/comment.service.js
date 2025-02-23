const commentModel = require('../models/comment.model')

class CommentService {
	async createComment(data, id) {
		const comment = await commentModel.create({ author: id, ...data })
		return comment
	}

	async getComment(id) {
		const comment = await commentModel.findById(id)
		return comment
	}
}

module.exports = new CommentService()
