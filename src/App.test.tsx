import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import App from "./App.js";

vi.mock("./routes/AppRouter", () => ({
  default: () => <div data-testid="app-router">App Router Content</div>,
}));

vi.mock("./components/layout/Header/Header", () => ({
  default: () => <header data-testid="app-header">Header</header>,
}));

vi.mock("./components/layout/Footer/Footer", () => ({
  default: () => <footer data-testid="app-footer">Footer</footer>,
}));

vi.mock("./components/common/ScrollToTop", () => ({
  default: () => null,
}));

describe("App Component", () => {
  it("debe renderizar el Header, el contenido principal y el Footer", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("app-header")).toBeInTheDocument();
    expect(screen.getByTestId("app-router")).toBeInTheDocument();
    expect(screen.getByTestId("app-footer")).toBeInTheDocument();
  });

  it("debe tener la clase CSS correcta para el contenedor principal", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveClass("main__content");
  });
});
