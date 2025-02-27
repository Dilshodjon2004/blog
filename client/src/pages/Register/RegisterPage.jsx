import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import $axios from '../../server'
import registerSchema from '../../schema/registerSchema'

const Register = () => {
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm({
		resolver: yupResolver(registerSchema),
	})

	const onSubmit = async values => {
		try {
			let res = await $axios.post('auth/register', values)
			console.log(res.data)
			// localStorage.setItem('accessToken', res.data.accessToken)
			navigate('/login')
		} catch (error) {
			console.log(error.response)
		}
	}
	return (
		<Fragment>
			<div className='container'>
				<div className='section-wrapper'>
					<h2 className='heading'>Register</h2>
					<form action='#' onSubmit={handleSubmit(onSubmit)}>
						<input
							type='text'
							placeholder='Firstname'
							{...register('firstName')}
						/>
						<input
							type='text'
							placeholder='Lastname'
							{...register('lastName')}
						/>
						<input
							type='text'
							placeholder='Username'
							{...register('username')}
						/>
						<input
							type='password'
							placeholder='Password'
							{...register('password')}
						/>
						<input type='password' placeholder='Connfirm password' />
						<button type='submit' className='btn'>
							Login
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default Register
