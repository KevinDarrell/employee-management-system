import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import './index.css'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: 1, 
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster 
          position="top-center" // Pindah ke tengah atas
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
            },
            success: {
              style: { background: '#10B981' }, // Hijau Modern
              iconTheme: { primary: '#fff', secondary: '#10B981' }
            },
            error: {
              style: { background: '#EF4444' }, // Merah Modern
              iconTheme: { primary: '#fff', secondary: '#EF4444' }
            }
          }} 
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)