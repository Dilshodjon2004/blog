module.exports = class UserDto {
	firstName
	lastName
	username
	role
	id

	constructor(model) {
		this.firstName = model.firstName
		this.lastName = model.lastName
		this.username = model.username
		this.role = model.role
		this.id = model._id
	}
}
