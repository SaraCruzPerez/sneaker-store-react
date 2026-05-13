import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../test/test-utils.js';
import { describe, it, expect, vi, afterEach } from 'vitest';
import WishlistItem from './WishlistItem.js';
import type { Product } from '../../types/models.js';

const mockProduct: Product = {
  id: 1, 
  name: 'Fall Limited Edition Sneakers',
  brand: 'Sneaker Company',
  price: 125,
  discount: 0,
  description: 'Test description',
  stock: 10,
  sizes: [40, 41],
  images: {
    main: ['img1.jpg'],
    thumbs: []
  }
};

describe('WishlistItem Component', () => {
  afterEach(cleanup);

  it('debe mostrar la información correcta del producto', () => {
    const onRemoveMock = vi.fn();
    render(<WishlistItem product={mockProduct} onRemove={onRemoveMock} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
    expect(screen.getAllByText('$125.00')).toHaveLength(2);
  });

  it('debe llamar a onRemove cuando se pulsa el botón de eliminar', () => {
    const onRemoveMock = vi.fn();
    render(<WishlistItem product={mockProduct} onRemove={onRemoveMock} />);
    
    const removeBtn = screen.getByLabelText(/remove fall limited edition sneakers from wishlist/i);
    fireEvent.click(removeBtn);
    
    expect(onRemoveMock).toHaveBeenCalledWith(mockProduct);
  });

  it('los enlaces deben apuntar a la URL correcta del producto', () => {
    const onRemoveMock = vi.fn();
    render(<WishlistItem product={mockProduct} onRemove={onRemoveMock} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', `/product/${mockProduct.id}`);
    });
  });
});