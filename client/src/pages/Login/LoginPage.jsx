import { Fragment } from 'react'
import '../../styles/pages/login.scss'
import loginSchema from '../../schema/loginSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import $axios from '../../server'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authStore } from '../../store/auth.store'
// import { useAuth } from '../../hooks/use-auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const LoginPage = () => {
	// const { setAuth } = useAuth()
	const { setIsAuth, setUser } = authStore()
	const navigate = useNavigate()

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(loginSchema),
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: async values => {
			const { data } = await $axios.post(`auth/login`, values)
			return data
		},
		onSuccess: data => {
			setUser(data.user)
			setIsAuth(true)
			localStorage.setItem('accessToken', data.accessToken)
			toast.success('Successfully logged in!')
			navigate('/')
		},
		onError: error => {
			toast.error(error.response?.data?.message)
		},
	})

	function onSubmit(values) {
		mutate(values)
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
