import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import WishlistItem from './WishlistItem.js';
import { NotificationProvider } from '../../context/NotificationContext.js';
import type { Product } from '../../types/models.js';

describe('WishlistItem Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Fall Limited Edition Sneakers',
    brand: 'Sneaker Company',
    price: 125,
    images: {
      main: ['img1.jpg'] 
    }
  } as unknown as Product;

  const renderWishlistItem = (onRemove = vi.fn()) => {
    return render(
      <MemoryRouter>
        <NotificationProvider>
          <WishlistItem product={mockProduct} onRemove={onRemove} />
        </NotificationProvider>
      </MemoryRouter>
    );
  };

  it('debe mostrar la información correcta del producto', () => {
    renderWishlistItem();
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
    expect(screen.getAllByText('$125.00')).toHaveLength(2);
  });

  it('debe llamar a onRemove cuando se pulsa el botón de eliminar', () => {
    const onRemoveMock = vi.fn();
    renderWishlistItem(onRemoveMock);
    
    const removeBtn = screen.getByLabelText(/Remove Fall Limited Edition Sneakers/i);
    fireEvent.click(removeBtn);
    
    expect(onRemoveMock).toHaveBeenCalledWith(mockProduct);
  });

  it('los enlaces deben apuntar a la URL correcta del producto', () => {
    renderWishlistItem();
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', `/product/${mockProduct.id}`);
    });
  });
});