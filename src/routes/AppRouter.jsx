import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home/Home.jsx"
import Collections from "../pages/Collections/Collections.jsx"
import Product from "../pages/Product/Product.jsx"
import Stores from "../pages/Stores/Stores.jsx"
import Register from "../pages/Register/Register.jsx"
import Profile from "../pages/Profile/Profile.jsx"
import Wishlist from "../pages/Wishlist/Wishlist.jsx"
import Cart from "../pages/Cart/Cart.jsx"
import Checkout from "../pages/Checkout/Checkout.jsx"
import NotFound from "../pages/NotFound/NotFound.jsx"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />       
      <Route path="/wishlist" element={<Wishlist />} />     
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter;
