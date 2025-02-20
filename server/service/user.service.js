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
}

module.exports = new UserService()
