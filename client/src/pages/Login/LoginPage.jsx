import { Fragment } from 'react'
import '../../styles/pages/login.scss'
import { useForm } from 'react-hook-form'
import loginSchema from '../../schema/loginSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import $axios from '../../server'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm({
		resolver: yupResolver(loginSchema),
	})

	const onSubmit = async values => {
		try {
			let res = await $axios.post('auth/login', values)
			console.log(res.data)
			localStorage.setItem('accessToken', res.data.accessToken)
			navigate('/')
		} catch (error) {
			console.log(error.response)
		}
	}
	return (
		<Fragment>
			<div className='container'>
				<div className='section-wrapper'>
					<h2 className='heading'>Login</h2>
					<form action='#' onSubmit={handleSubmit(onSubmit)}>
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
						<button type='submit' className='btn'>
							Login
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default LoginPage
