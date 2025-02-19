const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please enter your firstname!'],
		},
		lastName: {
			type: String,
			required: [true, 'Please enter your lastname!'],
		},
		username: {
			type: String,
			unique: true,
			required: [true, 'Please enter your username!'],
		},
		password: {
			type: String,
			select: false,
			minLength: 3,
			required: [true, 'Please enter your password!'],
		},
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
		info: {
			type: String,
			minLength: 5,
		},
		phoneNumber: {
			type: String,
		},
		birthday: {
			type: Date,
		},
		address: {
			type: String,
		},
		photo: {
			type: String,
		},
	},
	{ timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = model('User', userSchema)
