const express = require('express')
const router = express.Router()

const photoController = require('../controllers/photo.controller')
const { protect } = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')

router.post(
	'/upload',
	protect,
	upload.single('photo'),
	photoController.uploadPhoto
)

module.exports = router
