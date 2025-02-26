import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/components/_header.scss'
const Header = () => {
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
						<button className='btn'>Login</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
