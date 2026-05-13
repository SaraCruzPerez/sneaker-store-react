import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import OrderSuccess from './OrderSuccess.js';
import * as router from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('OrderSuccess Component Full Coverage', () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(router, 'useNavigate').mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar todos los elementos visuales incluyendo el icono', () => {
    render(<OrderSuccess />);

    const icon = screen.getByRole('presentation', { hidden: true }); 
    expect(icon).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: /order confirmed/i })).toBeInTheDocument();    
    expect(screen.getByText(/thank you for your purchase/i)).toBeInTheDocument();
  });

  it('debe navegar a Collections al hacer click en el botón', () => {
    render(<OrderSuccess />);

    const button = screen.getByRole('button', { name: /continue shopping/i });
    
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/collections');
  });

  it('debe cumplir con los requisitos de accesibilidad', () => {
    render(<OrderSuccess />);
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('aria-live', 'polite');
    
    expect(mainElement).toHaveClass('checkout-success');
  });
});