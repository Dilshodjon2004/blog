// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './styles/main.scss'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	// <StrictMode>
	<QueryClientProvider client={queryClient}>
		<ToastContainer position='top-right' autoClose='3000' />
		<App />
	</QueryClientProvider>
	// </StrictMode>
)
