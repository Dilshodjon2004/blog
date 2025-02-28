import axios from 'axios'
import $axios from '.'

const $api = axios.create({
	withCredentials: true,
	baseURL: `${import.meta.env.VITE_API_URL}`,
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
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
				originalRequest._isRetry = true
				const { data } = await $axios.get('auth/refresh')
				localStorage.setItem('accessToken', data.accessToken)
				return $api.request(originalRequest)
			} catch (error) {
				console.log('Not authorized')
			}
		}
		throw error
	}
)

export default $api

// https://blog-backend-lac.vercel.app/api/v1/