import * as yup from 'yup'

const loginSchema = yup.object().shape({
	username: yup.string(),
	password: yup.string(),
})
export default loginSchema
