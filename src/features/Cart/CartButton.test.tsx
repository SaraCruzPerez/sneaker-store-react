import React from 'react';
import { render, screen, cleanup } from '../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CartButton from './CartButton.js';
import { useCart } from '../../context/CartContext.js';

vi.mock('../../context/CartContext.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../context/CartContext.js')>();
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

describe('CartButton Component', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('no debe mostrar el círculo del contador cuando el carrito está vacío', () => {
    vi.mocked(useCart).mockReturnValue({
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      getTotalPrice: vi.fn(),
    });

    render(<CartButton />);

    const countBadge = screen.queryByText(/[0-9]/);
    expect(countBadge).not.toBeInTheDocument();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View cart, bag is empty');
  });

  it('debe mostrar la suma total de cantidades de los productos', () => {
    const mockCart = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 5 }
    ];

    vi.mocked(useCart).mockReturnValue({
      cart: mockCart as any,
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      getTotalPrice: vi.fn(),
    });

    render(<CartButton />);

    expect(screen.getByText('7')).toBeInTheDocument();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View cart, 7 items in bag');
  });

  it('debe dirigir a la ruta /cart correctamente', () => {
    vi.mocked(useCart).mockReturnValue({
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      getTotalPrice: vi.fn(),
    });

    render(<CartButton />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/cart');
  });
});