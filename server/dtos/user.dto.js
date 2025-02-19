module.exports = class UserDto {
	firstName
	lastName
	username
	id

	constructor(model) {
		this.firstName = model.firstName
		this.lastName = model.lastName
		this.username = model.username
		this.id = model._id
	}
}
