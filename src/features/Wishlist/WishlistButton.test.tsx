import React from 'react';
import { render, screen, cleanup } from '../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import WishlistButton from './WishlistButton.js';
import { useWishlist } from '../../context/WishlistContext.js';

vi.mock('../../context/WishlistContext.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../context/WishlistContext.js')>();
  return {
    ...actual,
    useWishlist: vi.fn(),
  };
});

describe('WishlistButton Component', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('debe mostrar el label de "no items saved" cuando la lista está vacía', () => {
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [],
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      isInWishlist: vi.fn().mockReturnValue(false),
      toggleWishlist: vi.fn(),
    });

    render(<WishlistButton />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View wishlist, no items saved');
    expect(screen.queryByText(/[0-9]/)).not.toBeInTheDocument();
  });

  it('debe mostrar el contador correcto cuando hay productos', () => {
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [{ id: 1 }, { id: 2 }] as any,
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      isInWishlist: vi.fn(),
      toggleWishlist: vi.fn(),
    });

    render(<WishlistButton />);

    expect(screen.getByText('2')).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View wishlist, 2 items saved');
  });

  it('debe dirigir a la ruta /wishlist correctamente', () => {
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [],
      addToWishlist: vi.fn(),
      removeFromWishlist: vi.fn(),
      isInWishlist: vi.fn(),
      toggleWishlist: vi.fn(),
    });

    render(<WishlistButton />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/wishlist');
  });
});