import { create } from 'zustand'

const useLoaderStore = create(set => ({
	loading: true,
	showLoader: () => set({ loading: true }),
	hideLoader: () => set({ loading: false }),
}))

export default useLoaderStore
