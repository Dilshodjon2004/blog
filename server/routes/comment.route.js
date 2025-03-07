const express = require('express')

const advancedResults = require('../middlewares/advancedResults')
const { protect, checkOwnership } = require('../middlewares/auth.middleware')
const commentController = require('../controllers/comment.controller')

const commentModel = require('../models/comment.model')

const router = express.Router()

router.route('/').post(protect, commentController.createComment)

router
	.route('/:id')
	.get(protect, commentController.getComment)
	.put(protect, checkOwnership('comment'), commentController.updateComment)
	.delete(protect, checkOwnership('comment'), commentController.deleteComment)

module.exports = router
