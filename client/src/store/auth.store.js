// import { create } from 'zustand'

// export const authStore = create(set => ({
// 	isLoading: false,
// 	isAuth: false,
// 	user: {},
// 	setUser: user => set({ user }),
// 	setLoading: bool => set({ isLoading: bool }),
// 	setIsAuth: bool => set({ isAuth: bool }),
// }))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const authStore = create(
	persist(
		set => ({
			isLoading: false,
			isAuth: false,
			user: {},
			accessToken: '',
			setUser: user => set({ user }),
			setLoading: bool => set({ isLoading: bool }),
			setIsAuth: bool => set({ isAuth: bool }),
			setAccessToken: token => set({ accessToken: token }),
		}),
		{
			name: 'auth-storage', // Key name in localStorage
			getStorage: () => localStorage, // Use localStorage for persistence
		}
	)
)
