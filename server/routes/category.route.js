const express = require('express')
const router = express.Router()

const categoryModel = require('../models/category.model')
const categoryController = require('../controllers/category.controller')

const { protect, authorize } = require('../middlewares/auth.middleware')

router
	.route('/')
	.get(categoryController.getCategories)
	.post(protect, categoryController.createCategory)

module.exports = router
