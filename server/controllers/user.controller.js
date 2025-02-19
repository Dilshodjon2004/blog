const UserService = require('../service/user.service')

class UserController {
	// @desc   Get all users
	// @route  GET /api/v1/auth/users
	// @access Private / admin
	async getUsers(req, res, next) {
		res.status(200).json(res.advancedResults)
	}

	// @desc   Create user
	// @route  GET /api/v1/auth/user
	// @access Private / admin
	async createUser(req, res, next) {
		try {
			const newUser = await UserService.createUser(req.body)
			res.status(201).json(newUser)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
