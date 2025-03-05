import useLoaderStore from '../store/loader.store'
import '../styles/components/_loader.scss'
import { RingLoader } from 'react-spinners'

const Loader = () => {
	const loading = useLoaderStore(state => state.loading)
	return (
		<div className={`loader ${loading ? 'visible' : 'hidden'}`}>
			<RingLoader
				size={60}
				color='#ffffff'
				speedMultiplier={3}
				cssOverride={{ transition: 'opacity 0.5s ease-in-out' }}
			/>
		</div>
	)
}

export default Loader
