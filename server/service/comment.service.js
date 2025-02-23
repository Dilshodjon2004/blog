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

	async updateComment(body, id) {
		const comment = await commentModel.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		})

		return comment
	}
}

module.exports = new CommentService()
