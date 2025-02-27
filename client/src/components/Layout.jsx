import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
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
