import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock("./App", () => ({ default: () => null }));
vi.mock("./context/UserContext", () => ({
  UserProvider: ({ children }: any) => children,
}));
vi.mock("./context/WishlistContext", () => ({
  WishlistProvider: ({ children }: any) => children,
}));
vi.mock("./context/CartContext", () => ({
  CartProvider: ({ children }: any) => children,
}));
vi.mock("./context/NotificationContext", () => ({
  NotificationProvider: ({ children }: any) => children,
}));
vi.mock("./components/common/ScrollToTop", () => ({ default: () => null }));

describe("Main Entry Point", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("debe llamar a createRoot y renderizar la aplicación si existe el elemento root", async () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootElement = document.getElementById("root");

    const { createRoot } = await import("react-dom/client");

    await import("./main.js");

    expect(createRoot).toHaveBeenCalledWith(rootElement);
    const mockRoot = (createRoot as any).mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalled();
  });

  it("debe lanzar un error si no encuentra el elemento root", async () => {
    document.body.innerHTML = "";

    await expect(import("./main.js")).rejects.toThrow(
      "Failed to find the root element. Check your index.html",
    );
  });
});
