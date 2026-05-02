import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserProvider, useUser } from './UserContext.js';
import type { UserData } from '../types/models.js';

const TestComponent = () => {
  const { user, login, logout, isLoggedIn } = useUser();

  const mockLoginData = { 
    name: 'Alice', 
    email: 'alice@test.com' 
  } as UserData;

  return (
    <div>
      <p data-testid="status">{isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
      <p data-testid="username">{user?.name || 'No User'}</p>
      <button onClick={() => login(mockLoginData)}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('UserContext', () => {
  it('debe proporcionar el estado inicial (logged out)', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
    expect(screen.getByTestId('username')).toHaveTextContent('No User');
  });

  it('debe actualizar el estado al hacer login', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginBtn = screen.getByText('Login');
    
    act(() => {
      loginBtn.click();
    });

    expect(screen.getByTestId('status')).toHaveTextContent('Logged In');
    expect(screen.getByTestId('username')).toHaveTextContent('Alice');
  });

  it('debe limpiar el estado al hacer logout', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginBtn = screen.getByText('Login');
    const logoutBtn = screen.getByText('Logout');

    act(() => {
      loginBtn.click();
    });
    
    expect(screen.getByTestId('status')).toHaveTextContent('Logged In');

    act(() => {
      logoutBtn.click();
    });

    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
    expect(screen.getByTestId('username')).toHaveTextContent('No User');
  });

  it('debe lanzar un error si useUser se utiliza fuera de un UserProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow("useUser must be used within a UserProvider");
    
    consoleSpy.mockRestore();
  });
});