import { Fragment } from 'react'

const Account = () => {
	return (
		<Fragment>
			<div className='container'>
				<div className='section-wrapper'>
					<h2 className='heading'>Account</h2>
					<form action='#'>
						<input type='text' placeholder='Firstname' />
						<input type='text' placeholder='Lastname' />
						<input type='text' placeholder='Username' />
						<input type='text' placeholder='Password' />
						<input type='text' placeholder='Connfirm password' />
						<button type='submit' className='btn'>
							Save
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default Account
