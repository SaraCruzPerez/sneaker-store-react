import React from 'react';
import { render as renderOriginal, fireEvent } from '@testing-library/react';
import { render, screen } from '../test/test-utils.js'; 
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WishlistProvider, useWishlist } from './WishlistContext.js';
import type { Product } from '../types/models.js';

describe('WishlistContext', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    brand: 'Sneaker Company',
    description: 'Test description',
    price: 125,
    discount: 0,
    stock: 10,
    sizes: [40, 42],
    images: {
      main: ['img1.jpg'],
      thumbs: ['img1-thumb.jpg']
    }
  };

  const TestComponent = () => {
    const { wishlist, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    return (
      <div>
        <p data-testid="count">{wishlist.length}</p>
        <p data-testid="is-in">{isInWishlist(1) ? 'yes' : 'no'}</p>
        <button onClick={() => toggleWishlist(mockProduct)}>Toggle</button>
        <button onClick={() => addToWishlist(mockProduct)}>Add</button>
        <button onClick={() => removeFromWishlist(1)}>Remove</button>
      </div>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe inicializar con un array vacío si localStorage no tiene nada', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('debe manejar errores de parseo en localStorage', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('wishlist', 'invalid-json-{');

    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error parsing wishlist from localStorage",
      expect.any(Error)
    );
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    consoleSpy.mockRestore();
  });

  it('debe añadir y quitar un producto usando toggleWishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    const toggleBtn = screen.getByText('Toggle');
    
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-in')).toHaveTextContent('yes');

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-in')).toHaveTextContent('no');
  });

  it('debe manejar las funciones individuales addToWishlist y removeFromWishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );

    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('Remove'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('debe cargar datos desde localStorage al iniciar', () => {
    const initialData = [{ ...mockProduct, id: 2, name: 'Saved Item' }];
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
    
    const ErrorComponent = () => {
      useWishlist();
      return null;
    };

    expect(() => renderOriginal(<ErrorComponent />)).toThrow("useWishlist must be used within a WishlistProvider");
    
    consoleSpy.mockRestore();
  });
});