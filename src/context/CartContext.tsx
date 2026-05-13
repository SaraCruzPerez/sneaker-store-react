import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from "react";
import type { CartItem } from "../types/models.js";

interface AddToCartInput {
  id: number; 
  name: string;
  brand: string;
  price: number;
  discount: number;
  image: string;
  description?: string;
  stock?: number;
  sizes?: (string | number)[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: AddToCartInput, quantity: number, size: string | number) => void;
  removeFromCart: (productId: number, size: string | number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return [];
    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch (error) {
      console.error("Error parsing cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: AddToCartInput, quantity: number, size: string | number) => {
    if (!product || !size || quantity <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id && item.size === size);
      const numQuantity = Number(quantity);
      const finalPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + numQuantity }
            : item
        );
      }

      const newItem: CartItem = {
        ...product,
        description: product.description || "",
        stock: product.stock ?? 1,
        sizes: product.sizes || [],
        images: { main: [product.image], thumbs: [product.image] },
        quantity: numQuantity,
        size,
        finalPrice,
      };
      return [...prevCart, newItem];
    });
  }, []);

  const removeFromCart = useCallback((productId: number, size: string | number) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
  }, [cart]);

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, clearCart, getTotalPrice }), 
    [cart, addToCart, removeFromCart, clearCart, getTotalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};