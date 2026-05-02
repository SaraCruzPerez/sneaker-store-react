import React from 'react';
import { render as renderOriginal } from '@testing-library/react';
import { render, screen, act } from '../test/test-utils.js'; 
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WishlistProvider, useWishlist } from './WishlistContext.js';
import type { Product } from '../types/models.js';

describe('WishlistContext', () => {
  const mockProduct = {
    id: '1',
    name: 'Fall Limited Edition Sneakers',
    price: 125,
    images: ['img1.jpg']
  } as unknown as Product;

  const TestComponent = () => {
    const { wishlist, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    return (
      <div>
        <p data-testid="count">{wishlist.length}</p>
        <p data-testid="is-in">{isInWishlist('1') ? 'yes' : 'no'}</p>
        <button onClick={() => toggleWishlist(mockProduct)}>Toggle</button>
        <button onClick={() => addToWishlist(mockProduct)}>Add</button>
        <button onClick={() => removeFromWishlist('1')}>Remove</button>
      </div>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe añadir y quitar un producto usando toggleWishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    const toggleBtn = screen.getByText('Toggle');
    act(() => { toggleBtn.click(); });
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    act(() => { toggleBtn.click(); });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('debe manejar las funciones individuales addToWishlist y removeFromWishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    act(() => { screen.getByText('Add').click(); });
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    act(() => { screen.getByText('Remove').click(); });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('debe cargar datos desde localStorage al iniciar', () => {
    const initialData = [{ id: '2', name: 'Saved Item', price: 10, images: [] }];
    localStorage.setItem('wishlist', JSON.stringify(initialData));

    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('debe lanzar error si se usa fuera del Provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    let errorThrown: any = null;
    
    const ErrorComponent = () => {
      try {
        useWishlist();
      } catch (e) {
        errorThrown = e;
      }
      return null;
    };

    renderOriginal(<ErrorComponent />);

    expect(errorThrown).not.toBeNull();
    expect(errorThrown.message).toBe("useWishlist must be used within a WishlistProvider");
    
    consoleSpy.mockRestore();
  });
});