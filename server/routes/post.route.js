const express = require('express')
const router = express.Router()

const postModel = require('../models/post.model')
const postController = require('../controllers/post.controller')

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth.middleware')

router.route('/').post(protect, postController.createPost).get(protect, postController.getPosts)

module.exports = router
