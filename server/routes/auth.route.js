const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()
const { protect } = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', protect, authController.logout) // protected
router.get('/refresh', authController.refresh)

router.get('/me', protect, authController.getMe) //protected
router.put('/update', protect, authController.update) //protected
router.put('/password', protect, authController.updatePassword) // protected
router.put(
	'/upload-image',
	protect,
	upload.single('photo'),
	authController.uploadUserImage
) // protected
router.put(
	'/update-image',
	protect,
	upload.single('photo'),
	authController.updateUserImage
) // protected
router.delete('/delete-image', protect, authController.deleteUserImage) // protected

router.get('/get-users', protect, authController.getUsers) // protected

module.exports = router
