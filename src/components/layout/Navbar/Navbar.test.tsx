import React from 'react';
import { render, screen } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar.js';

describe('Navbar Component', () => {
  it('debe marcar el enlace activo con la clase por defecto de NavLink', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /^home$/i });
    expect(homeLink).toHaveClass('active');
  });
});