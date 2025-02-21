const { Schema, model } = require('mongoose')

const categorySchema = new Schema(
	{
		name: {
			type: String,
			minLength: 3,
			required: [true, 'Please enter the name!'],
		},
		description: {
			type: String,
			minLength: 10,
			maxLength: 500,
			required: [true, 'Please enter the description!'],
		},
		author: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		photo: {
			type: String,
		},
	},
	{ timestamps: true }
)

module.exports = model('Category', categorySchema)
