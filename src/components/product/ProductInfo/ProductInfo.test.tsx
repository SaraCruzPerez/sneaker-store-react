import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ProductInfo from './ProductInfo.js';

const mockProduct = {
  id: 1, name: 'Shoes', brand: 'Adidas', price: 100, discount: 10,
  description: 'Desc', stock: 10, sizes: [40], images: { main: ['1.jpg'], thumbs: [] }
};

describe('FastProductInfo', () => {
  const add = vi.fn();
  const wish = vi.fn();

  afterEach(cleanup);

  it('100% Coverage Sprint', () => {
    const { rerender } = render(
      <ProductInfo product={mockProduct as any} onAddToCart={add} isFavorite={false} onWishlistToggle={wish} />
    );

    expect(screen.getByText('$90.00')).toBeInTheDocument();

    const plus = screen.getByLabelText(/increase/i);
    fireEvent.click(plus);
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/decrease/i));
    fireEvent.click(screen.getByLabelText(/decrease/i)); 

    const addBtn = screen.getByText(/add to cart/i);
    fireEvent.click(addBtn);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('40'));
    expect(screen.queryByRole('alert')).toBeNull();
    fireEvent.click(addBtn);
    expect(add).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText(/wishlist/i));
    expect(wish).toHaveBeenCalled();
    
    rerender(<ProductInfo product={mockProduct as any} onAddToCart={add} isFavorite={true} onWishlistToggle={wish} />);
    fireEvent.click(screen.getByLabelText(/wishlist/i));
  });

  it('Rama sin descuento', () => {
    render(<ProductInfo product={{...mockProduct, discount: 0} as any} onAddToCart={add} isFavorite={false} onWishlistToggle={wish} />);
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });
});