import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
const authPages = ['/login']

const Layout = () => {
	const location = useLocation()
	return (
		<div
			className={authPages.includes(location.pathname) ? 'layout' : 'undefined'}
		>
			<Header />
			<Outlet />
			<Footer />
		</div>
	)
}

export default Layout
