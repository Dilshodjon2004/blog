const categoryModel = require('../models/category.model')

class CategoryService {
	// @desc   Create category
	// @route  POST /api/v1/category/
	// @access Private / admin
	async createCategory(details, author) {
		const category = await categoryModel.create({ author, ...details })
		return category
	}

	// @desc   Get category
	// @route  GET /api/v1/category/
	// @access Public
	async getCategories() {
		const categories = await categoryModel.find()
		return categories
	}
}

module.exports = new CategoryService()
