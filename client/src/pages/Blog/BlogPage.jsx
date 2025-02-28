// import { authStore } from '../../store/auth.store'

import $api from '../../server/api'

const BlogPage = () => {
	// const { user } = authStore()
	const getUser = async () => {
		try {
			const { data } = await $api.get('auth/me')
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	getUser()

	return (
		<div>
			BlogPage <p>user</p>
		</div>
	)
}

export default BlogPage
