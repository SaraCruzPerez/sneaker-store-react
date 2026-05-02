import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import UserButton from './UserButton.js';
import { UserContext } from '../../context/UserContext.js';
import type { UserData } from '../../types/models.js';

describe('UserButton Component', () => {
  const mockUser = {
    name: 'Alice',
    email: 'alice@test.com'
  } as unknown as UserData;

  const renderUserButton = (isLoggedIn: boolean, user: UserData | null = null) => {
    return render(
      <MemoryRouter>
        <UserContext.Provider value={{ 
          isLoggedIn, 
          user, 
          login: vi.fn(), 
          logout: vi.fn() 
        }}>
          <UserButton />
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  it('debe dirigir a /register cuando no está logueado', () => {
    renderUserButton(false);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/register');
    expect(link).toHaveAttribute('aria-label', 'Register or login');
  });

  it('debe dirigir a /profile cuando está logueado', () => {
    renderUserButton(true, mockUser);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/profile');
    expect(link).toHaveAttribute('aria-label', 'Go to Alice profile');
  });

  it('debe mostrar "your profile" si el usuario no tiene nombre definido', () => {
    renderUserButton(true, {} as UserData); 
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Go to your profile');
  });

  it('debe aplicar la clase de logueado correctamente', () => {
    renderUserButton(true, mockUser);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('user__btn-logged');
  });
});