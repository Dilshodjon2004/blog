const { Schema, model } = require('mongoose')

const postSchema = new Schema(
	{
		title: {
			type: String,
			minLength: 3,
			maxLength: 255,
			required: [true, 'Please enter the title!'],
		},
		category: {
			type: Schema.ObjectId,
			ref: 'Category',
			required: [true, 'Please enter the category!'],
		},
		tags: {
			type: [String],
			required: [true, 'Please enter the tags!'],
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
			required: [true, 'Please enter the user!'],
		},
		photo: {
			type: String,
		},
	},
	{ timestamps: true }
)

module.exports = model('Post', postSchema)
