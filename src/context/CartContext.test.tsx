import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, act, cleanup } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext.js";
import React from "react";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("CartContext 100% Coverage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(cleanup);

  const p1 = { id: 1, name: "Product 1", brand: "B", price: 100, discount: 10, image: "i" };

  it("debe cubrir todas las ramas", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      // @ts-ignore
      result.current.addToCart(null, 1, "M");      
      result.current.addToCart(p1, 1, "");
      result.current.addToCart(p1, 0, "M");
      result.current.addToCart(p1, -1, "M");
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it("debe cubrir con y Sin descuento", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart(p1, 1, "M"); 
      result.current.addToCart({ ...p1, id: 2, discount: 0 }, 1, "M");
    });

    expect(result.current.cart[0]!.finalPrice).toBe(90);  
    expect(result.current.cart[1]!.finalPrice).toBe(100); 
  });

  it("debe cubrir la línea 52 (Lógica AND en el map)", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart(p1, 1, "M");
      result.current.addToCart({ ...p1, id: 3 }, 1, "M");
    });

    act(() => {
      result.current.addToCart(p1, 1, "M");
      result.current.addToCart(p1, 1, "XL");
    });

    expect(result.current.cart).toHaveLength(3);
  });

  it("debe manejar localStorage y errores de parseo", () => {
    const saved = [{ ...p1, quantity: 1, size: "M", finalPrice: 90, images: {main:[], thumbs:[]} }];
    localStorage.setItem("cart", JSON.stringify(saved));
    renderHook(() => useCart(), { wrapper: ({ children }) => <CartProvider>{children}</CartProvider> });
    
    localStorage.setItem("cart", "invalid");
    renderHook(() => useCart(), { wrapper: ({ children }) => <CartProvider>{children}</CartProvider> });
    expect(console.error).toHaveBeenCalled();
  });

  it("debe gestionar el resto de funciones (clear, remove, total)", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });
    act(() => { result.current.addToCart(p1, 1, "M"); });
    expect(result.current.getTotalPrice()).toBe(90);
    act(() => { result.current.removeFromCart(1, "M"); });
    expect(result.current.cart).toHaveLength(0);
    act(() => {
      result.current.addToCart(p1, 1, "M");
      result.current.clearCart();
    });
    expect(result.current.cart).toHaveLength(0);
  });

  it("debe lanzar error fuera del provider", () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow();
    consoleSpy.mockRestore();
  });
});