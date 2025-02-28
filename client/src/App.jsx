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

const App = () => {
	const { setIsAuth, setLoading, setUser } = authStore()

	const chechAuth = async () => {
		try {
			setLoading(true)
			const { data } = await $axios.get('auth/refresh')
			localStorage.setItem('accessToken', data.accessToken)
			setIsAuth(true)
			setUser(data.user)
		} catch (error) {
			toast.error(error.response?.data?.message)
			localStorage.removeItem('accessToken')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			chechAuth()
		}
	}, [])
	
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<Register />} />
					<Route path='/account' element={<Account />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
