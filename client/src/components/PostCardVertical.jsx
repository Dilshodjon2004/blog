import '../styles/components/_postCardVertical.scss'
import image from '../assets/images/image.jpg'
const PostCardVertical = () => {
	return (
		<div className='card'>
			<div className='card-image__wrapper'>
				<img src={image} alt='' />
			</div>
			<div className='card-info__wrapper'>
				<p className='card-details'>
					By <span className='card-author'>John Doe</span> |{' '}
					<span className='card-date'>Aug 23, 2021</span>
				</p>
				<h3 className='card-title'>
					A UX Case Study Creating a Studious Environment for Students:
				</h3>
				<p className='card-description'>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident.
				</p>
			</div>
		</div>
	)
}

export default PostCardVertical
