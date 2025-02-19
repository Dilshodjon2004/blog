const { validationResult } = require('express-validator')
const AuthService = require('../service/auth.service')
const BaseError = require('../errors/base.error')
const authService = require('../service/auth.service')
const userModel = require('../models/user.model')

class AuthController {
	// @desc   Register user
	// @route  POST /api/v1/auth/register
	// @access public
	async register(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(
					BaseError.BadRequest('Error with validation', errors.array())
				)
			}
			const { firstName, lastName, username, password } = req.body
			const data = await AuthService.register(
				firstName,
				lastName,
				username,
				password
			)
			res.cookie('refreshToken', data.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: true,
			})
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Login user
	// @route  POST /api/v1/auth/login
	// @access public
	async login(req, res, next) {
		try {
			const { username, password } = req.body
			const data = await authService.login(username, password)
			res.cookie('refreshToken', data.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: true,
			})
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Login user
	// @route  POST /api/v1/auth/logout
	// @access private
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await authService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json({ token })
		} catch (error) {
			next(error)
		}
	}

	// @desc   Update password
	// @route  POST /api/v1/auth/password
	// @access private
	async updatePassword(req, res, next) {
		try {
			await authService.updatePassword(req.user.id, req.body)
			return res.status(200).json({ success: true })
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get users
	// @route  POST /api/v1/auth/get-users
	// @access private

	async getUsers(req, res, next) {
		try {
			const data = await authService.getUsers()
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Refresh
	// @route  POST /api/v1/auth/refresh
	// @access public
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const data = await authService.refreshToken(refreshToken)
			res.cookie('refreshToken', data.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: true,
			})
			return res.json(data)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Get me
	// @route  POST /api/v1/auth/me
	// @access private
	async getMe(req, res, next) {
		try {
			const userId = req.user.id
			const user = await authService.getMe(userId)
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Update user info
	// @route  POST /api/v1/auth/update
	// @access private
	async update(req, res, next) {
		try {
			const user = await authService.update(req.user.id, req.body)
			return res.status(200).json(user)
			// console.log(req.user.id)
		} catch (error) {
			next(error)
		}
	}

	// @desc   Upload user image
	// @route  POST /api/v1/auth/upload
	// @access private
	async uploadUserImage(req, res, next) {
		try {
			if (!req.file) {
				return res.status(400).json({ message: 'Image is required!' })
			}

			const user = await userModel.findById(req.user.id)
			if (!user.photo) {
				await authService.uploadUserImage(req.user.id, req.file.path)
				res.status(201).json({
					message: 'Image uploaded successfully!',
				})
			} else {
				res.status(400).json({ message: 'You have already uploaded image!' })
			}
		} catch (error) {
			next(error)
		}
	}

	// @desc   Update user image
	// @route  POST /api/v1/auth/delete-image
	// @access private
	async updateUserImage(req, res, next) {
		try {
			if (!req.file) {
				return res.status(400).json({ message: 'Image is required!' })
			}

			const user = await userModel.findById(req.user.id)
			if (!user.photo) {
				res.status(400).json({ message: 'There is no any image to update!' })
			} else {
				await authService.updateUserImage(req.user.id, req.file.path)
				res.status(200).json({ message: 'Image updated successfully' })
			}
		} catch (error) {
			next(error)
		}
	}

	// @desc   Delete user image
	// @route  POST /api/v1/auth/delete-image
	// @access private
	async deleteUserImage(req, res, next) {
		try {
			await authService.deleteUserImage(req.user.id)
			res.status(200).json({ message: 'Image deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AuthController()
