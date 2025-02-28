import axios from 'axios'
import $axios from '.'
import { authStore } from '../store/auth.store'

const $api = axios.create({
	withCredentials: true,
	baseURL: `${import.meta.env.VITE_API_URL}`,
})

$api.interceptors.request.use(config => {
	const { accessToken } = authStore.getState()
	config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			try {
				const { setAccessToken } = authStore.getState()
				originalRequest._isRetry = true
				const { data } = await $axios.get('auth/refresh')
				setAccessToken(data.accessToken)
				return $api.request(originalRequest)
			} catch (error) {
				console.log('Not authorized')
				console.log(error)
			}
		}
		throw error
	}
)

export default $api
