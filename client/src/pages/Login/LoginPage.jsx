import { Fragment } from 'react'
import '../../styles/pages/login.scss'
const LoginPage = () => {
	return (
		<Fragment>
			<div className='container'>
				<div className='section-wrapper'>
					<h2 className='heading'>Login</h2>
					<form action='#'>
						<input type='text' placeholder='Username' />
						<input type='text' placeholder='Password' />
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
