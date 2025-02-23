const commentModel = require('../models/comment.model')

class CommentService {
	async createComment(data, id) {
		const comment = await commentModel.create({ author: id, ...data })
		return comment
	}
}

module.exports = new CommentService()
