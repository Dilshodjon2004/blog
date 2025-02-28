import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/components/_header.scss'
import { authStore } from '../store/auth.store'
import { toast } from 'react-toastify'
import $axios from '../server'
const Header = () => {
	const { setIsAuth, setUser, setAccessToken } = authStore()
	const navigate = useNavigate()

	const logout = async () => {
		try {
			await $axios.post('auth/logout')
			setAccessToken('')
			setIsAuth(false)
			setUser({})
			navigate('/login')
		} catch (error) {
			toast.error(error.response?.data?.message)
		}
	}
	return (
		<div className='navbar'>
			<div className='container'>
				<div className='navbar-items__wrapper'>
					<Link to={'/'}>
						<img src={logo} alt='logo' />
					</Link>
					<div className='navbar-items'>
						<ul className='nav-links'>
							<li className='nav-link'>Home</li>
							<li className='nav-link'>Blog</li>
							<li className='nav-link'>About Us</li>
							<li className='nav-link'>Register</li>
						</ul>
						<button className='btn' onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
