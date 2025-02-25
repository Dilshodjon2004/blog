import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import '../styles/components/_footer.scss'
const Footer = () => {
	return (
		<footer>
			<div className='container'>
				<div className='footer-items__wrapper'>
					<div className='footer-item'>
						<p>Finstreet 118 2561 Fintown</p>
						<p>
							Hello@finsweet.com <span>020 7993 2905</span>
						</p>
					</div>
					<div className='footer-icons'>
						<FaFacebook />
						<FaTwitter />
						<FaInstagram />
						<FaLinkedin />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
