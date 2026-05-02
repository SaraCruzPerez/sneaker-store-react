import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import WishlistButton from './WishlistButton.js';
import { WishlistContext } from '../../context/WishlistContext.js';
import type { Product } from '../../types/models.js';

describe('WishlistButton Component', () => {
  const renderWishlistButton = (wishlistItems: Product[] = []) => {
    const mockContextValue = {
      wishlist: wishlistItems,
      toggleWishlist: vi.fn(),
      isInWishlist: (id: string) => wishlistItems.some(item => item.id === id)
    };

    return render(
      <MemoryRouter>
        <WishlistContext.Provider value={mockContextValue as any}>
          <WishlistButton />
        </WishlistContext.Provider>
      </MemoryRouter>
    );
  };

  it('debe mostrar el label de "no items saved" cuando la lista está vacía', () => {
    renderWishlistButton([]);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View wishlist, no items saved');
  });

  it('debe mostrar el contador cuando hay items', () => {
    const mockItems = [{ id: '1', name: 'Product' } as unknown as Product];
    renderWishlistButton(mockItems);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});