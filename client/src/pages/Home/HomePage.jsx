import { Fragment, useEffect, useState } from 'react'
import { authStore } from '../../store/auth.store'
import $axios from '../../server'
import Hero from '../../components/Hero'
import useLoaderStore from '../../store/loader.store'

const HomePage = () => {
	const { showLoader, hideLoader } = useLoaderStore()
	const { user } = authStore()
	console.log(user)

	const [post, setPost] = useState()

	const fetchData = async () => {
		try {
			showLoader()
			const { data } = await $axios.get('post/lastone')
			setPost(data)
			console.log(post)
		} catch (error) {
			console.log(error)
		} finally {
			hideLoader()
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Fragment>
			<Hero post={post} />
		</Fragment>
	)
}

export default HomePage
