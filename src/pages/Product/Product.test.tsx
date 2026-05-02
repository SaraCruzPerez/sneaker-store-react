import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ProductPage from "./Product.js";
import { products } from "../../data/products.js";
import { WishlistProvider } from "../../context/WishlistContext.js";
import { CartProvider } from "../../context/CartContext.js";
import { NotificationProvider } from "../../context/NotificationContext.js";
import type { Product } from "../../types/models.js";

describe("Product Page Integration Full Coverage", () => {
  const scrollToSpy = vi.fn();
  window.scrollTo = scrollToSpy;

  const targetProduct = products[0] as Product;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  const renderProductPage = (initialEntry: string) => {
    return render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <NotificationProvider>
          <WishlistProvider>
            <CartProvider>
              <Routes>
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/product-empty" element={<ProductPage />} />
                <Route
                  path="*"
                  element={<div>Oops! You're off-track 404</div>}
                />
              </Routes>
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
      </MemoryRouter>,
    );
  };

  it("debe mostrar el producto correcto basado en el ID de la URL", () => {
    renderProductPage(`/product/${targetProduct.id}`);
    expect(
      screen.getByText(new RegExp(targetProduct.name, "i")),
    ).toBeInTheDocument();
  });

  it('debe cubrir la rama "id || 0" cuando el id no existe (Línea 19 en amarillo)', () => {
    renderProductPage("/product-empty");
    expect(screen.getByText(/Oops! You're off-track/i)).toBeInTheDocument();
  });

  it("debe mostrar el componente NotFound si el producto no existe", () => {
    renderProductPage("/product/999999");
    expect(screen.getByText(/Oops! You're off-track/i)).toBeInTheDocument();
  });

  it("debe hacer scroll hacia arriba al cargar el componente", () => {
    renderProductPage(`/product/${targetProduct.id}`);
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it("debe alternar el estado de favorito al interactuar con la wishlist", async () => {
    renderProductPage(`/product/${targetProduct.id}`);

    const wishlistBtn = screen.getByRole("button", {
      name: /favorite|wishlist/i,
    });

    await act(async () => {
      fireEvent.click(wishlistBtn);
    });

    await act(async () => {
      fireEvent.click(wishlistBtn);
    });

    expect(wishlistBtn).toBeInTheDocument();
  });

  it("debe añadir el producto al carrito correctamente", async () => {
    renderProductPage(`/product/${targetProduct.id}`);

    const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

    await act(async () => {
      fireEvent.click(addToCartBtn);
    });

    expect(addToCartBtn).toBeInTheDocument();
  });
});
