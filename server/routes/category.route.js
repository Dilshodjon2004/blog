const express = require('express')
const router = express.Router()

const categoryModel = require('../models/category.model')
const categoryController = require('../controllers/category.controller')

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth.middleware')

router
	.route('/')
	.get(advancedResults(categoryModel), categoryController.getCategories)
	.post(protect, categoryController.createCategory)

router
	.route('/:id')
	.get(categoryController.getCategory)
	.put(protect, authorize('admin'), categoryController.updateCategory)
	.delete(protect, authorize('admin'), categoryController.deleteCategory)

router.route('/delete-image/:id').delete(protect, authorize('admin'), categoryController.deleteImage)

module.exports = router
