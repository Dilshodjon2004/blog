import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import Register from './pages/Register/RegisterPage'
import Layout from './components/Layout'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
