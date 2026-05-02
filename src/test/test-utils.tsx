import React, { type ReactElement, type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext.js";
import { WishlistProvider } from "../context/WishlistContext.js";
import { UserProvider } from "../context/UserContext.js";
import { NotificationProvider } from "../context/NotificationContext.js";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <UserProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </UserProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
