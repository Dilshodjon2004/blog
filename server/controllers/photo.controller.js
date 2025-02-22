class PhotoController {
	async uploadPhoto(req, res, next) {
		try {
			const { file } = req
			return res.json({ data: file.path })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new PhotoController()
