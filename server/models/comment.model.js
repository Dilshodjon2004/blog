const { model, Schema } = require('mongoose')

const commentSchema = new Schema(
	{
		author: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		post: {
			type: Schema.ObjectId,
			ref: 'Post',
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = model('Comment', commentSchema)
