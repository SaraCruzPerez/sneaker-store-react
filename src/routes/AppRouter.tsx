import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home.js";
import Collections from "../pages/Collections/Collections.js";
import Product from "../pages/Product/Product.js";
import Stores from "../pages/Stores/Stores.js";
import Register from "../pages/Register/Register.js";
import Profile from "../pages/Profile/Profile.js";
import Wishlist from "../pages/Wishlist/Wishlist.js";
import Cart from "../pages/Cart/Cart.js";
import Checkout from "../pages/Checkout/Checkout.js";
import NotFound from "../pages/NotFound/NotFound.js";

const AppRouter: React.FC = () => {
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
  );
};

export default AppRouter;