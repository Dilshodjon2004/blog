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
		const category = await categoryModel.find()
		return category
	}

	// @desc   Get category by id
	// @route  GET /api/v1/category/
	// @access Public
	async getCategory(id) {
		const category = await categoryModel.findById(id)
		return category
	}

	// @desc   Update categoru
	// @route  Put /api/v1/category/
	// @access Private / admin
	async updateCategory(id, details, author) {
		const category = await categoryModel.findByIdAndUpdate(
			id,
			{ author, ...details },
			{ new: true, runValidators: true }
		)
		return category
	}

	// @desc   Delete category
	// @route  DELETE /api/v1/category/
	// @access Private / admin
	async deleteCategory(id) {
		await categoryModel.findByIdAndDelete(id)
		return null
	}

	// @desc   Delete image
	// @route  DELETE /api/v1/category/delete-image/:id
	// @access Private / admin
	async deleteImage(id) {
		const category = await categoryModel.findById(id)
		if (!category) {
			return null
		}
		await category.updateOne({
			$unset: {
				photo: '',
			},
		})
		return null
	}
}

module.exports = new CategoryService()
