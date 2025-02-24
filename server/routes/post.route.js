const express = require('express')
const router = express.Router()

const postModel = require('../models/post.model')
const postController = require('../controllers/post.controller')

const advancedResults = require('../middlewares/advancedResults')
const { protect, checkOwnership } = require('../middlewares/auth.middleware')

router
	.route('/')
	.post(protect, postController.createPost)
	.get(protect, advancedResults(postModel), postController.getPosts)

router.route('/lastone').get(postController.getLatestPost)
router.route('/lastones').get(postController.getLatestPosts)
router.route('/comment/:id').get(postController.getComments)

router
	.route('/:id')
	.get(protect, postController.getPost)
	.put(protect, checkOwnership('post'), postController.updatePost)
	.delete(protect, checkOwnership('post'), postController.deletePost)

router
	.route('/delete-image/:id')
	.delete(protect, checkOwnership('post'), postController.deleteImage)

module.exports = router
