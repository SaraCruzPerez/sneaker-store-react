import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import AppRouter from "./AppRouter.js";

vi.mock("../pages/Home/Home", () => ({ default: () => <div>Home Page</div> }));
vi.mock("../pages/Collections/Collections", () => ({
  default: () => <div>Collections Page</div>,
}));
vi.mock("../pages/Product/Product", () => ({
  default: () => <div>Product Detail</div>,
}));
vi.mock("../pages/Stores/Stores", () => ({
  default: () => <div>Stores Page</div>,
}));
vi.mock("../pages/Register/Register", () => ({
  default: () => <div>Register Page</div>,
}));
vi.mock("../pages/Profile/Profile", () => ({
  default: () => <div>Profile Page</div>,
}));
vi.mock("../pages/Wishlist/Wishlist", () => ({
  default: () => <div>Wishlist Page</div>,
}));
vi.mock("../pages/Cart/Cart", () => ({ default: () => <div>Cart Page</div> }));
vi.mock("../pages/Checkout/Checkout", () => ({
  default: () => <div>Checkout Page</div>,
}));
vi.mock("../pages/NotFound/NotFound", () => ({
  default: () => <div>Not Found Page</div>,
}));

describe("AppRouter", () => {
  const routes = [
    { path: "/", text: "Home Page" },
    { path: "/collections", text: "Collections Page" },
    { path: "/product/123", text: "Product Detail" },
    { path: "/stores", text: "Stores Page" },
    { path: "/register", text: "Register Page" },
    { path: "/profile", text: "Profile Page" },
    { path: "/wishlist", text: "Wishlist Page" },
    { path: "/cart", text: "Cart Page" },
    { path: "/checkout", text: "Checkout Page" },
    { path: "/ruta-que-no-existe", text: "Not Found Page" },
  ];

  it.each(routes)(
    'debe navegar a "$path" y mostrar "$text"',
    ({ path, text }) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <AppRouter />
        </MemoryRouter>,
      );

      expect(screen.getByText(text)).toBeInTheDocument();
    },
  );
});
