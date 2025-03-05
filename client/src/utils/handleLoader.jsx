import useLoaderStore from '../store/loader.store'

export const handleLoader = (delay = 500) => {
	const { showLoader, hideLoader } = useLoaderStore.getState() // Directly get store state

	showLoader()
	setTimeout(() => hideLoader(), delay) // Hide loader after delay
}
