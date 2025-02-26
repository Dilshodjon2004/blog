import { create } from 'zustand'

export const useAuth = create(set => ({
	authState: 'login',
	setAuth: state => set({ authState: state }),
}))
