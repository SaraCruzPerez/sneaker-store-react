import React from 'react';
import { render, screen, cleanup } from '../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import UserButton from './UserButton.js';
import { useUser } from '../../context/UserContext.js';
import type { UserData } from '../../types/models.js';

vi.mock('../../context/UserContext.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../context/UserContext.js')>();
  return {
    ...actual,
    useUser: vi.fn(),
  };
});

describe('UserButton Component', () => {
  const mockUser: UserData = {
    name: 'Alice',
    email: 'alice@test.com'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('debe dirigir a /register cuando no está logueado', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn()
    });

    render(<UserButton />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/register');
    expect(link).toHaveAttribute('aria-label', 'Register or login');
  });

  it('debe dirigir a /profile cuando está logueado', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoggedIn: true,
      user: mockUser,
      login: vi.fn(),
      logout: vi.fn()
    });

    render(<UserButton />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/profile');
    expect(link).toHaveAttribute('aria-label', 'Go to Alice profile');
    expect(link).toHaveClass('user__btn-logged');
  });

  it('debe mostrar "your profile" si el usuario no tiene nombre definido', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoggedIn: true,
      user: { email: 'test@test.com' } as UserData, 
      login: vi.fn(),
      logout: vi.fn()
    });

    render(<UserButton />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Go to your profile');
  });
});