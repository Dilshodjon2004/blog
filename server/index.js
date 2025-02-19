require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

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
