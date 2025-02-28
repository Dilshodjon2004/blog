import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import Register from './pages/Register/RegisterPage'
import Layout from './components/Layout'
import Account from './pages/Account/AccountPage'
import { authStore } from './store/auth.store'
import $axios from './server'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import BlogPage from './pages/Blog/BlogPage'

const App = () => {
	const { setIsAuth, setLoading, setUser, setAccessToken } = authStore()

	const checkAuth = async () => {
		try {
			setLoading(true)
			const localData = localStorage.getItem('auth-storage')
			const token = localData.state.accessToken
			if (token === '') {
				setLoading(false)
				return
			}

			const { data } = await $axios.get('auth/refresh')
			setAccessToken(data.accessToken)
			setIsAuth(true)
			setUser(data.user)
		} catch (error) {
			console.log('hi from home')
			toast.error(error.response?.data?.message)
			// setAccessToken('')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/blog' element={<BlogPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<Register />} />
					<Route path='/account' element={<Account />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
