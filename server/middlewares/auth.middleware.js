const BaseError = require('../errors/base.error')
const postModel = require('../models/post.model')
// const userModel = require('../models/user.model')
// const jwt = require('jsonwebtoken')
const tokenService = require('../service/token.service')

exports.protect = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization
		if (!authorization) {
			return next(BaseError.UnauthorizedError())
		}

		const accessToken = authorization.split(' ')[1]
		if (!accessToken) {
			return next(BaseError.UnauthorizedError())
		}

		const userData = tokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next(BaseError.UnauthorizedError())
		}

		req.user = userData
		next()
	} catch (error) {
		next(error)
	}
}

// exports.authorize = (...roles) => {
// 	return (req, res, next) => {
// 		if (!roles.includes(req.user.role)) {
// 			return next(
// 				BaseError.BadRequest(
// 					`User role ${req.user.role} is not authorized to access this route.`
// 				)
// 			)
// 		}
// 		next()
// 	}
// }

exports.checkOwnership = async (req, res, next) => {
	try {
		const post = await postModel
			.findById(req.params.id)
			.populate('author', 'id')
		if (!post) {
			return next(BaseError.BadRequest('Post not found'))
		}

		if (post.author.id !== req.user.id) {
			return next(
				BaseError.BadRequest('You are not authorized to update this post')
			)
		}
		next()
	} catch (error) {
		next(error)
	}
}

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Not authenticated' })
		}

		if (!roles.includes(req.user.role)) {
			return res
				.status(403)
				.json({ message: `User role ${req.user.role} is not authorized` })
		}

		next()
	}
}
