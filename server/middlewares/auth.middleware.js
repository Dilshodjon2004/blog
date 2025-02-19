const BaseError = require('../errors/base.error')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
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

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new BaseError.BadRequest(
					`User role ${req.user.role} is not authorized to access this route.`
				)
			)
		}
		next()
	}
}
