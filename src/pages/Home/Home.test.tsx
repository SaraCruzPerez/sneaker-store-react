import React from "react";
import { render, screen } from "../../test/test-utils.js";
import { describe, it, expect } from "vitest";
import Home from "./Home.js";

describe("Home Page", () => {
  it("debe renderizar el Hero con el título principal y el botón de llamada a la acción", () => {
    render(<Home />);

    expect(screen.getByText(/INTO THE FUTURE/i)).toBeInTheDocument();

    const shopBtn = screen.getByRole("link", { name: /shop now/i });
    expect(shopBtn).toBeInTheDocument();
    expect(shopBtn).toHaveAttribute("href", "/collections");
  });

  it("debe mostrar las características del servicio (Envío, Calidad, Seguridad)", () => {
    render(<Home />);

    expect(screen.getByText(/Free Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium Quality/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure Payment/i)).toBeInTheDocument();
  });

  it("debe tener una estructura accesible en la sección de features", () => {
    render(<Home />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});
