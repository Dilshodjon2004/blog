const commentModel = require('../models/comment.model')

class CommentService {
	// @desc   Create comment
	// @route  POST /api/v1/post/
	// @access Private
	async createComment(data, id) {
		const comment = await commentModel.create({ author: id, ...data })
		return comment
	}

	// @desc   Get comment by id
	// @route  GET /api/v1/post/:id
	// @access Public
	async getComment(id) {
		const comment = await commentModel.findById(id)
		return comment
	}

	// @desc   Update comment
	// @route  PUT /api/v1/post/:id
	// @access Private / only for author
	async updateComment(body, id) {
		const comment = await commentModel.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		})
		return comment
	}

	// @desc   Delete comment
	// @route  DELETE /api/v1/post/:id
	// @access Private / only for author
	async deleteComment(id) {
		await commentModel.findByIdAndDelete(id)
	}
}

module.exports = new CommentService()
