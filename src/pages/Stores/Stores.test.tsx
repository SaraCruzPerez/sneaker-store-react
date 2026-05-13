import React from "react";
import { render, screen, fireEvent, cleanup } from "../../test/test-utils.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Stores from "./Stores.js";
import * as reactLeaflet from "react-leaflet";
import type { Map } from "leaflet";

vi.mock("leaflet", () => {
  return {
    default: {
      DivIcon: vi.fn().mockImplementation(function (this: any) {
        return {}; 
      }),
    },
  };
});

const mockSetView = vi.fn();
const mockInvalidateSize = vi.fn();

vi.mock("react-leaflet", async () => {
  const actual = await vi.importActual<typeof import("react-leaflet")>("react-leaflet");
  return {
    ...actual,
    MapContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="map-container">{children}</div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: () => <div data-testid="marker" />,
    useMap: vi.fn(),
  };
});

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
    
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    const mockMapInstance = {
      setView: mockSetView,
      invalidateSize: mockInvalidateSize,
    } as Partial<Map>;

    vi.mocked(reactLeaflet.useMap).mockReturnValue(mockMapInstance as Map);
  });

  afterEach(() => {
    cleanup();
  });

  it("debe renderizar correctamente y mostrar marcadores", () => {
    render(<Stores />);
    expect(screen.getByText("Central Store")).toBeInTheDocument();
    expect(screen.getAllByTestId("marker")).toHaveLength(1);
  });

  it("no debe actualizar el mapa si useMap devuelve null", () => {
    vi.mocked(reactLeaflet.useMap).mockReturnValue(null as unknown as Map);

    render(<Stores />);

    expect(mockSetView).not.toHaveBeenCalled();
  });

  it("debe disparar scrollIntoView en móvil", () => {
    window.innerWidth = 375;
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, "scrollIntoView");

    render(<Stores />);
    const storeButton = screen.getByRole("button", { name: /central store/i });
    fireEvent.click(storeButton);

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("no debe hacer scroll si la pantalla es desktop", () => {
    window.innerWidth = 1024;
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, "scrollIntoView");

    render(<Stores />);
    const storeButton = screen.getByRole("button", { name: /central store/i });
    fireEvent.click(storeButton);

    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("debe resetear la vista al pulsar el botón de reset", () => {
    render(<Stores />);
    const resetBtn = screen.getByRole("button", { name: /view all on map/i });
    const storeBtn = screen.getByRole("button", { name: /central store/i });
    
    fireEvent.click(storeBtn);
    expect(storeBtn).toHaveClass("is-active");

    fireEvent.click(resetBtn);
    expect(storeBtn).not.toHaveClass("is-active");
  });
});