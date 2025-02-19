const UserDto = require('../dtos/user.dto')
const BaseError = require('../errors/base.error')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const tokenService = require('../service/token.service')

class AuthService {
	// @desc   Register user
	// @route  POST /api/v1/auth/register
	// @access public
	async register(firstName, lastName, username, password) {
		const existUser = await userModel.findOne({ username })

		if (existUser) {
			throw BaseError.BadRequest(`User with this username already exists!`)
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const user = await userModel.create({
			firstName,
			lastName,
			username,
			password: hashPassword,
		})
		const userDto = new UserDto(user)

		const tokens = tokenService.generateToken({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { user: userDto, ...tokens }
	}

	// @desc   Login user
	// @route  POST /api/v1/auth/login
	// @access public
	async login(username, password) {
		username = username.trim().toLowerCase()

		if (!username || !password) {
			throw BaseError.BadRequest('Please enter your username and password!')
		}

		// Check for user
		const user = await userModel.findOne({ username }).select('+password')
		if (!user) {
			throw BaseError.BadRequest('User not found!')
		}

		const isPassword = await bcrypt.compare(password, user.password)
		if (!isPassword) {
			throw BaseError.BadRequest('Password is incorrect!')
		}

		const userDto = new UserDto(user)

		const tokens = tokenService.generateToken({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { user: userDto, ...tokens }
	}

	// @desc   Logout user
	// @route  POST /api/v1/auth/login
	// @access private
	async logout(refreshToken) {
		return await tokenService.removeToken(refreshToken)
	}

	// @desc   Update password
	// @route  POST /api/v1/auth/password
	// @access private
	async updatePassword(id, body) {
		const user = await userModel.findById(id).select('+password')

		// Check current password
		const isEqual = await user.matchPassword(body.currentPassword)

		if (!isEqual) {
			throw BaseError.BadRequest('Current password is incorrect!')
		}

		const newPassword = await bcrypt.hash(body.newPassword, 10)
		await userModel.findByIdAndUpdate(id, { password: newPassword })
	}

	// @desc   Get users
	// @route  POST /api/v1/auth/get-users
	// @access private
	async getUsers() {
		return await userModel.find()
	}

	// @desc   Refresh token
	// @route  POST /api/v1/auth/refresh
	// @access public
	async refreshToken(refreshToken) {
		if (!refreshToken) {
			throw BaseError.BadRequest('Bad authorization')
		}

		const userPayload = tokenService.validateRefreshToken(refreshToken)
		const tokenDB = await tokenService.findToken(refreshToken)

		if (!userPayload || !tokenDB) {
			throw BaseError.BadRequest('Bad authorization')
		}

		const user = await userModel.findById(userPayload.id)
		const userDto = new UserDto(user)

		const tokens = tokenService.generateToken({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { user: userDto, ...tokens }
	}

	// @desc   Get me
	// @route  POST /api/v1/auth/me
	// @access private
	async getMe(userId) {
		const user = await userModel.findById(userId)
		return user
	}

	// @desc   Update user info
	// @route  POST /api/v1/auth/upadte
	// @access private
	async update(id, body) {
		const user = await userModel.findByIdAndUpdate(id, body, {
			new: true,
			runValidors: true,
		})

		return user
	}

	// @desc   Upload user image
	// @route  POST /api/v1/auth/upload
	// @access private
	async uploadUserImage(id, path) {
		const user = await userModel.findByIdAndUpdate(
			id,
			{
				photo: path,
			},
			{ new: true, runValidators: true }
		)

		return user
	}

	// @desc   Update user image
	// @route  POST /api/v1/auth/delete-image
	// @access private
	async updateUserImage(id, path) {
		const user = await userModel.findByIdAndUpdate(
			id,
			{
				photo: path,
			},
			{ new: true, runValidators: true }
		)

		return user
	}

	// @desc   Delete user image
	// @route  POST /api/v1/auth/delete-image
	// @access private
	async deleteUserImage(id) {
		const user = await userModel.findByIdAndUpdate(
			id,
			{
				$unset: { photo: '' },
			},
			{
				new: true,
				runValidators: true,
			}
		)

		if (!user) {
			return res.status(404).json({ message: 'User not found!' })
		}

		return user
	}
}

module.exports = new AuthService()
