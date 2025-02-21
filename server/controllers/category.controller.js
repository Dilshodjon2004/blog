const categoryService = require('../service/category.service')

class CategoryController {
	// @desc   Create category
	// @route  POST /api/v1/category/
	// @access Private / admin
	async createCategory(req, res, next) {
		try {
			const category = await categoryService.createCategory(
				req.body,
				req.user.id
			)
			res.status(200).json(category)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get category
	// @route  GET /api/v1/category/
	// @access Public
	async getCategories(req, res, next) {
		try {
			const categories = await categoryService.getCategories()
			res.status(200).json(categories)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new CategoryController()
