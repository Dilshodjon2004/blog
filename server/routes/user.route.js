const express = require('express')
const router = express.Router()

const userModel = require('../models/user.model')

const UserController = require('../controllers/user.controller')

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth.middleware')

router.use(protect)
router.use(authorize('admin'))

router
	.route('/')
	.get(advancedResults(userModel), UserController.getUsers)
	.post(UserController.createUser)

module.exports = router
