import React from "react";
import { render, screen, fireEvent, act } from "../../test/test-utils.js";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Stores from "./Stores.js";
import * as reactLeaflet from "react-leaflet";

vi.mock("leaflet", () => ({
  default: {
    DivIcon: vi.fn(),
  },
}));

const mockSetView = vi.fn();
const mockInvalidateSize = vi.fn();

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: any) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: () => <div data-testid="marker" />,
  useMap: vi.fn(),
}));

vi.mock("../../data/storesData.js", () => ({
  stores: [
    {
      id: "1",
      name: "Central Store",
      city: "Madrid",
      address: "Calle Mayor 1",
      coords: [40.41, -3.7],
    },
  ],
}));

describe("Stores Page Full Coverage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.innerWidth = 1024;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    (reactLeaflet.useMap as any).mockReturnValue({
      setView: mockSetView,
      invalidateSize: mockInvalidateSize,
    });
  });

  it("debe renderizar correctamente y mostrar marcadores", () => {
    render(<Stores />);
    expect(screen.getByText("Central Store")).toBeInTheDocument();
    expect(screen.getAllByTestId("marker")).toHaveLength(1);
  });

  it("debe cubrir la rama negativa de la línea 18 (map no existe)", () => {
    (reactLeaflet.useMap as any).mockReturnValue(null);

    render(<Stores />);

    expect(mockSetView).not.toHaveBeenCalled();
  });

  it("debe disparar scrollIntoView en móvil (Línea 36-37)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, "scrollIntoView");

    render(<Stores />);
    const storeButton = screen.getByText("Central Store").closest("button")!;

    fireEvent.click(storeButton);

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("no debe hacer scroll si la pantalla es desktop (Línea 36 rama falsa)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, "scrollIntoView");

    render(<Stores />);
    fireEvent.click(screen.getByText("Central Store").closest("button")!);

    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("debe resetear la vista al pulsar el botón de reset", () => {
    render(<Stores />);
    const resetBtn = screen.getByRole("button", { name: /view all on map/i });

    const storeBtn = screen.getByText("Central Store").closest("button")!;
    fireEvent.click(storeBtn);
    expect(storeBtn).toHaveClass("is-active");

    fireEvent.click(resetBtn);

    expect(storeBtn).not.toHaveClass("is-active");
  });

  it("debe actualizar el mapa cuando cambian las coordenadas", () => {
    render(<Stores />);

    const storeBtn = screen.getByText("Central Store").closest("button")!;
    fireEvent.click(storeBtn);

    expect(mockSetView).toHaveBeenCalled();
    expect(mockInvalidateSize).toHaveBeenCalled();
  });
});
