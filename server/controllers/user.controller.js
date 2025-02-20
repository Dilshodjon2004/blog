const UserService = require('../service/user.service')

class UserController {
	// @desc   Get all users
	// @route  GET /api/v1/auth/user
	// @access Private / admin
	async getUsers(req, res, next) {
		res.status(200).json(res.advancedResults)
	}

	// @desc   Get user by id (get)
	// @route  GET /api/v1/auth/user/:id
	// @access Private / admin
	async getUser(req, res, next) {
		try {
			const user = await UserService.getUser(req.params.id)
			res.status(200).json({ success: true, data: user })
		} catch (error) {
			next(error)
		}
	}

	// @desc   Update user by id (put)
	// @route  GET /api/v1/auth/user/:id
	// @access Private / admin
	async updateUser(req, res, next) {
		try {
			const user = await UserService.updateUser(req.params.id, req.body)
			res.status(200).json(user)
		} catch (error) {
			next(error)
		}
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

	// @desc   Delete user by id (delete)
	// @route  GET /api/v1/auth/user
	// @access Private / admin
	async deleteUser(req, res, next) {
		try {
			const deletedUser = await UserService.deleteUser(req.params.id)
			res.status(200).json(null)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
