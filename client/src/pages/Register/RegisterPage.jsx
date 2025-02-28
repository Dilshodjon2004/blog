import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import registerSchema from '../../schema/registerSchema'
import $axios from '../../server'
import { authStore } from '../../store/auth.store'

const Register = () => {
	// const { setAuth, authState } = useAuth()
	const { setIsAuth, setUser, setAccessToken, accessToken } = authStore()
	const navigate = useNavigate()

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(registerSchema),
	})

	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: async values => {
			const { data } = await $axios.post('auth/register', values)
			return data
		},
		onSuccess: data => {
			setUser(data.user)
			setIsAuth(true)
			setAccessToken(data.accessToken)
			toast.success('Successfully registered!')
			navigate('/login')
		},
		onError: error => {
			toast.error(error.response?.data?.message)
		},
	})

	function onSubmit(values) {
		mutate(values)
	}

	useEffect(() => {
		if (accessToken !== '') {
			navigate('/')
		}
	}, [])
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
							Register
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default Register
