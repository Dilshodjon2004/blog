const commentService = require('../service/comment.service')

class CommentController {
	// @desc   Create comment
	// @route  POST /api/v1/post/
	// @access Private
	async createComment(req, res, next) {
		try {
			const comment = await commentService.createComment(req.body, req.user.id)
			res.status(200).json(comment)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get comment by id
	// @route  GET /api/v1/post/:id
	// @access Public
	async getComment(req, res, next) {
		try {
			const comment = await commentService.getComment(req.params.id)
			res.status(200).json(comment)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Update comment
	// @route  PUT /api/v1/post/:id
	// @access Private / only for author
	async updateComment(req, res, next) {
		try {
			const comment = await commentService.updateComment(
				req.body,
				req.params.id
			)

			res.status(200).json(comment)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Delete comment
	// @route  DELETE /api/v1/post/:id
	// @access Private / only for author
	async deleteComment(req, res, next) {
		try {
			await commentService.deleteComment(req.params.id)
			res.status(200).json({ msg: 'deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new CommentController()
