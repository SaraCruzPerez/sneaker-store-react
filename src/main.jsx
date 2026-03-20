import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { UserProvider } from './context/UserContext'
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext.jsx'

import App from './App.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import 'leaflet/dist/leaflet.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>      
      <UserProvider> 
        <NotificationProvider>
          <WishlistProvider>
            <CartProvider> 
              <ScrollToTop />
              <App />
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
      </UserProvider>
    </BrowserRouter>    
  </StrictMode>
)