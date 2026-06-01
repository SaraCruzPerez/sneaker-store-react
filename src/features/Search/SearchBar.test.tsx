import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar.js";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SearchBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  it("renders correctly with empty initial state", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search products") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  it("synchronizes and populates input value from URL parameter (IKEA behavior)", () => {
    render(
      <MemoryRouter initialEntries={["/collections?search=Terra"]}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search products") as HTMLInputElement;
    expect(input.value).toBe("Terra");
  });

  it("updates local state value when user types", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search products") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Nike Air" } });
    
    expect(input.value).toBe("Nike Air");
  });

  it("navigates to collections with search param when form is submitted with text", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search products");
    const form = screen.getByRole("search");

    fireEvent.change(input, { target: { value: "  Jordan  " } });
    fireEvent.submit(form);

    expect(mockNavigate).toHaveBeenCalledWith("/collections?search=Jordan");
  });

  it("navigates to base collections path when form is submitted empty", () => {
    render(
      <MemoryRouter initialEntries={["/collections?search=PreviousSearch"]}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search products");
    const form = screen.getByRole("search");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(form);

    expect(mockNavigate).toHaveBeenCalledWith("/collections");
  });
});