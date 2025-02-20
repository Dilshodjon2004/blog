const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class UserService {
	// @desc   Create user
	// @route  POST /api/v1/user/
	// @access private / admin
	async createUser(body) {
		const password = await bcrypt.hash(body.password, 10)
		return await userModel.create({ ...body, password: password })
	}

	// @desc   Get user
	// @route  POST /api/v1/user/:id
	// @access private / admin
	async getUser(id) {
		const user = await userModel.findById(id)
		return user
	}

	// @desc   Update user by id (put)
	// @route  POST /api/v1/user/:id
	// @access private / admin
	async updateUser(id, body) {
		const user = await userModel.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		})
		return user
	}

	// @desc   Delete user by id (delete)
	// @route  POST /api/v1/user/:id
	// @access private / admin
	async deleteUser(id) {
		await userModel.findByIdAndDelete(id)
		return null
	}
}

module.exports = new UserService()
