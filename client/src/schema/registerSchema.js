import * as yup from 'yup'

const registerSchema = yup.object().shape({
	firstName: yup.string(),
	lastName: yup.string(),
	username: yup.string(),
	password: yup.string(),
})
export default registerSchema
