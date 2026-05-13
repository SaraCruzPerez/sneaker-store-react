import React, { type ReactElement, type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { UserProvider } from "../context/UserContext";
import { NotificationProvider } from "../context/NotificationContext";
import userEvent from "@testing-library/user-event";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <UserProvider> 
        <NotificationProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
      </UserProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return render(ui, { 
    wrapper: AllTheProviders, 
    ...options 
  });
};

export * from "@testing-library/react";
export { customRender as render, userEvent };