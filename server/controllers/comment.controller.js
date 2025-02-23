const commentService = require('../service/comment.service')

class CommentController {
	async createComment(req, res, next) {
		try {
			const comment = await commentService.createComment(req.body, req.user.id)
			res.status(200).json(comment)
		} catch (error) {
			next(error)
		}
	}

	async getComment(req, res, next) {
		try {
			const comment = await commentService.getComment(req.params.id)
			res.status(200).json(comment)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new CommentController()
