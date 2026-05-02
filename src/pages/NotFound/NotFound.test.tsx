import React from "react";
import { render, screen } from "../../test/test-utils.js";
import { describe, it, expect } from "vitest";
import NotFound from "./NotFound.js";

describe("NotFound Page", () => {
  it("debe renderizar el código de error y el título de página no encontrada", () => {
    render(<NotFound />);

    const title = screen.getByRole("heading", {
      name: /oops! you're off-track/i,
    });
    expect(title).toBeInTheDocument();

    expect(
      screen.getByText(/the page you are looking for doesn't exist/i),
    ).toBeInTheDocument();
  });

  it("debe mostrar el código 404 aunque esté oculto para lectores de pantalla", () => {
    render(<NotFound />);

    const code = screen.getByText("404");
    expect(code).toBeInTheDocument();
    expect(code).toHaveClass("error__code");
  });

  it("debe contener un enlace que redirija a la colección", () => {
    render(<NotFound />);

    const backBtn = screen.getByRole("link", { name: /back to collection/i });

    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toHaveAttribute("href", "/collections");
  });

  it("debe tener el atributo aria-live para anunciar el cambio de estado", () => {
    render(<NotFound />);

    const mainContainer = screen.getByRole("main");
    expect(mainContainer).toHaveAttribute("aria-live", "polite");
  });
});
