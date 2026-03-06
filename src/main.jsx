import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { UserProvider } from './context/UserContext'
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'

import App from './App.jsx'
import 'leaflet/dist/leaflet.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>      
      <UserProvider> 
        <WishlistProvider>
          <CartProvider> 
            <App />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </BrowserRouter>    
  </StrictMode>
)