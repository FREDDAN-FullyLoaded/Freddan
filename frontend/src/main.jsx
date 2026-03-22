import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#F5F5F5',
            border: '1px solid #C8102E',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600,
          },
          success: { iconTheme: { primary: '#FFB800', secondary: '#0A0A0A' } },
          error: { iconTheme: { primary: '#C8102E', secondary: '#F5F5F5' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
