import { authStore } from '../../store/auth.store'

const HomePage = () => {
	const { user } = authStore()
	console.log(user)

	return (
		<div>
			HomePage <p>{import.meta.env.VITE_API_URL}</p>
			<h1>{user.firstName}</h1>
		</div>
	)
}

export default HomePage
