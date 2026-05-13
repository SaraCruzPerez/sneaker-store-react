import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/UserContext.js';
import { WishlistProvider } from './context/WishlistContext.js';
import { CartProvider } from './context/CartContext.js';
import { NotificationProvider } from './context/NotificationContext.js';

import App from './App.js';
import 'leaflet/dist/leaflet.css';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element. Check your index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>      
      <UserProvider> 
        <NotificationProvider>
          <WishlistProvider>
            <CartProvider> 
              <App />
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
      </UserProvider>
    </BrowserRouter>    
  </StrictMode>
);