import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'
import { SocketProvider } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <StrictMode>
  <SocketProvider>
    <App />
    <Toaster closeButton/>

  </SocketProvider>
  </StrictMode>

)
