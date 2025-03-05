import { Fragment } from 'react'
import { format, parseISO } from 'date-fns'
import { FaChevronRight } from 'react-icons/fa'
import '../styles/components/_hero.scss'

const Hero = ({ post }) => {
	return (
		<Fragment>
			<div className='hero' style={{ '--bg-url': `url(${post?.photo})` }}>
				<div className='container'>
					<div className='hero-items__wrapper'>
						<h3 className='hero-category'>
							Posted on{' '}
							<span className='hero-category__name'>{post?.category.name}</span>
						</h3>
						<h1 className='hero-post__name'>{post?.title}</h1>
						<p className='hero-post__details'>
							By{' '}
							<span className='hero-post__author'>
								{post?.author.firstName} {post?.author.lastName}
							</span>{' '}
							|{' '}
							<span className='hero-post__date'>
								{post?.createdAt &&
									format(parseISO(post.createdAt), 'MMMM d, yyyy')}
							</span>
						</p>
						<p className='hero-post__description'>{post?.description}</p>
						<button className='btn'>
							Read More <FaChevronRight />
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Hero
