require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userModel = require('./models/user.model')

const app = express()

app.use(
	cors({
		origin: process.env.CLIENT_URL?.split(',') || '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	})
)

app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/v1/auth', require('./routes/auth.route'))
app.use('/api/v1/user', require('./routes/user.route'))
app.use('/api/v1/post', require('./routes/post.route'))
app.use('/api/v1/comment', require('./routes/comment.route'))
app.use('/api/v1/category', require('./routes/category.route'))
app.use('/api/v1/photo', require('./routes/photo.route'))

app.get('/', (req, res) => {
	res.json({ message: 'Hello from backend' })
})

const PORT = process.env.PORT || 8080

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log('Connected to MongoDB')
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}/`)
		})
	})
	.catch(error => {
		console.log(error)
		process.exit(1)
	})

// async function makeAdmin(username) {
// 	try {
// 		const user = await userModel.findOne({ username })
// 		if (!user) {
// 			console.log('User not found')
// 			return
// 		}
// 		user.role = 'admin'
// 		await user.save()
// 		console.log(`User ${username} is now an admin`)
// 		mongoose.disconnect()
// 	} catch (error) {
// 		console.log('Error:', error)
// 		mongoose.disconnect()
// 	}
// }

// makeAdmin('dilshod111')
