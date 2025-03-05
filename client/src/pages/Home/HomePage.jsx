import { useEffect, useState } from 'react'
import { authStore } from '../../store/auth.store'
import $axios from '../../server'
import Hero from '../../components/Hero'
// import useLoaderStore from '../../store/loader.store'
import '../../styles/pages/home.scss'
import PostCardVertical from '../../components/PostCardVertical'

const HomePage = () => {
	// const { showLoader, hideLoader } = useLoaderStore()
	const { user } = authStore()
	console.log(user)

	const [post, setPost] = useState()

	const fetchData = async () => {
		try {
			// showLoader()
			const { data } = await $axios.get('post/lastone')
			setPost(data)
			console.log(post)
		} catch (error) {
			console.log(error)
		} finally {
			// hideLoader()
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className='home'>
			<Hero post={post} />
			<section className='popular-blogs'>
				<div className='container'>
					<h2 className='heading'>Popular blogs</h2>
					<div className='blog-cards'>
						<PostCardVertical />
						<PostCardVertical />
						<PostCardVertical />
					</div>
				</div>
			</section>
		</div>
	)
}

export default HomePage
