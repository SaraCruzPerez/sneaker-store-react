import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ProductCard from './ProductCard.js';
import type { Product } from '../../../types/models.js';

const mockProduct = {
  id: '1',
  name: 'Sneaker Pro',
  brand: 'Nike',
  price: 100,
  discount: 20,
  images: { main: ['image1.jpg'], gallery: [] },
  sizes: ['40', '41'],
  description: 'Test',
  category: 'shoes'
} as unknown as Product;

describe('ProductCard Full Coverage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('debe ejecutar el foco en la primera talla tras abrir el selector (L57)', () => {
    render(<ProductCard product={mockProduct} />);
    const cartBtn = screen.getByLabelText(/add to cart/i);

    fireEvent.click(cartBtn);

    act(() => {
      vi.runAllTimers(); 
    });

    const firstSizeBtn = screen.getByText('40');
    
    expect(firstSizeBtn).toHaveFocus();
    expect(document.activeElement).toBe(firstSizeBtn);
  });

  it('debe cubrir handleSelectSize por completo y cerrar el selector', async () => {
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByLabelText(/add to cart/i));
    
    const overlay = screen.getByText('Select Size').closest('.product__overlay');
    const sizeBtn = screen.getByText('41');
    fireEvent.click(sizeBtn);

    act(() => {
      vi.runAllTimers();
    });

    expect(overlay).not.toHaveClass('is-active');
  });

  it('debe cerrar el selector al hacer click fuera', () => {
    render(
      <div data-testid="outside">
        <ProductCard product={mockProduct} />
      </div>
    );

    fireEvent.click(screen.getByLabelText(/add to cart/i));
    const overlay = screen.getByText('Select Size').closest('.product__overlay');
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    act(() => {
      vi.runAllTimers();
    });
    expect(overlay).not.toHaveClass('is-active');
  });

  it('debe cubrir setIsHoveredWish y handleFavorite (toggle de favoritos)', () => {
    render(<ProductCard product={mockProduct} />);
    const wishBtn = screen.getByLabelText(/add to wishlist/i);
    
    fireEvent.mouseEnter(wishBtn);
    fireEvent.mouseLeave(wishBtn);
    
    fireEvent.click(wishBtn);
    
    const removeBtn = screen.getByLabelText(/remove from wishlist/i);
    fireEvent.click(removeBtn);
  });

  it('debe renderizar correctamente sin descuento y manejar imagen vacía', () => {
    const noDiscount = { 
      ...mockProduct, 
      discount: 0,
      images: { main: [], gallery: [] } 
    } as unknown as Product;
    
    render(<ProductCard product={noDiscount} />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText(/add to cart/i));
    fireEvent.click(screen.getByText('40'));
  });
});

function act(callback: () => void) {
  callback();
}