// import { authStore } from '../../store/auth.store'

import { useEffect } from 'react'
import $api from '../../server/api'
import { handleLoader } from '../../utils/handleLoader'

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

	useEffect(() => {
		handleLoader()
	}, [])
	return (
		<div>
			BlogPage <p>user</p>
		</div>
	)
}

export default BlogPage
