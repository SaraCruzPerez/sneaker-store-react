import React, { createContext, useState, useContext, useEffect } from "react";
import type { CartItem } from "../types/models.js";

interface AddToCartInput {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  discount: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: AddToCartInput, quantity: number, size: string) => void;
  removeFromCart: (productId: string | number, size: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart) as CartItem[];
      } catch (error) {
        console.error("Error parsing cart from localStorage", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: AddToCartInput,
    quantity: number,
    size: string,
  ) => {
    if (!product || !size) return;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size,
      );

      const numQuantity = Number(quantity);
      const finalPrice =
        product.discount > 0
          ? product.price * (1 - product.discount / 100)
          : product.price;

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const existingItem = newCart[existingItemIndex];

        if (existingItem) {
          newCart[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + numQuantity,
          };
        }
        return newCart;
      } else {
        const newItem: any = {
          ...product,
          quantity: numQuantity,
          size: size,
          finalPrice: finalPrice,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId: string | number, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.size === size)),
    );
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.finalPrice * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
