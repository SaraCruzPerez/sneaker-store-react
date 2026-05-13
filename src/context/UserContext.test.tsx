import React from 'react';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { UserProvider, useUser } from './UserContext.js';

const TestComponent = () => {
  const { user, login, logout, isLoggedIn } = useUser();
  const mockLoginData = { name: 'Alice', email: 'alice@test.com' };

  return (
    <div>
      <p data-testid="status">{isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
      <p data-testid="username">{user?.name || 'No User'}</p>
      <button onClick={() => login(mockLoginData)}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('UserContext Full Coverage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('debe manejar el estado inicial vacío', () => {
    render(<UserProvider><TestComponent /></UserProvider>);
    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
  });

  it('debe cargar desde localStorage correctamente', () => {
    const existingUser = { id: '123', name: 'Bob', email: 'bob@test.com' };
    localStorage.setItem('user', JSON.stringify(existingUser));

    render(<UserProvider><TestComponent /></UserProvider>);

    expect(screen.getByTestId('status')).toHaveTextContent('Logged In');
    expect(screen.getByTestId('username')).toHaveTextContent('Bob');
  });

  it('debe capturar errores de parseo en el inicializador', () => {
    localStorage.setItem('user', '{corrupt-json');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<UserProvider><TestComponent /></UserProvider>);

    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('debe persistir el usuario al hacer login', () => {
    render(<UserProvider><TestComponent /></UserProvider>);
    
    fireEvent.click(screen.getByText('Login'));
    
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    expect(stored.name).toBe('Alice');
    expect(stored.id).toBeDefined();
  });

  it('debe eliminar del storage al hacer logout', () => {
    const existingUser = { id: '123', name: 'Bob', email: 'bob@test.com' };
    localStorage.setItem('user', JSON.stringify(existingUser));

    render(<UserProvider><TestComponent /></UserProvider>);
    
    fireEvent.click(screen.getByText('Logout'));

    expect(localStorage.getItem('user')).toBeNull();
    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
  });

  it('debe lanzar error fuera del Provider (Líneas 68-72)', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow("useUser must be used within a UserProvider");
    
    consoleSpy.mockRestore();
  });
});