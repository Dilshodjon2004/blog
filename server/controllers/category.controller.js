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

	// @desc   Get categories
	// @route  GET /api/v1/category/
	// @access Public
	async getCategories(req, res, next) {
		try {
			await categoryService.getCategories()
			res.status(200).json(res.advancedResults)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get category by id
	// @route  GET /api/v1/category/
	// @access Public
	async getCategory(req, res, next) {
		try {
			const category = await categoryService.getCategory(req.params.id)
			res.status(200).json(category)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Update category
	// @route  PUT /api/v1/category/
	// @access Private / admin
	async updateCategory(req, res, next) {
		try {
			const category = await categoryService.updateCategory(
				req.params.id,
				req.body,
				req.user.id
			)
			res.status(200).json(category)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Delete category
	// @route  DELETE /api/v1/category/
	// @access Private / admin
	async deleteCategory(req, res, next) {
		try {
			const category = await categoryService.deleteCategory(req.params.id)
			res.status(200).json({ message: 'Category deleted successfully!' })
		} catch (error) {
			next(error)
		}
	}

	// @desc   Delete category image
	// @route  DELETE /api/v1/category/delete-image/:id
	// @access Private / admin
	async deleteImage(req, res, next) {
		try {
			await categoryService.deleteImage(req.params.id)
			res.status(200).json({ message: 'Image deleted successfully!' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new CategoryController()
