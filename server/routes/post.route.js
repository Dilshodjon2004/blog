const express = require('express')
const router = express.Router()

const postModel = require('../models/post.model')
const postController = require('../controllers/post.controller')

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth.middleware')

router
	.route('/')
	.post(protect, postController.createPost)
	.get(protect, advancedResults(postModel), postController.getPosts)

router
	.route('/:id')
	.get(protect, postController.getPost)
	.put(protect, postController.updatePost)
	.delete(protect, postController.deletePost)

router.route('/delete-image/:id').delete(protect, postController.deleteImage)
module.exports = router
