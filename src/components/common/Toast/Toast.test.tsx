import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Toast from './Toast.js';

describe('Toast Component Coverage', () => {
  it('debe renderizar el símbolo "+" para la acción "add"', () => {
    render(<Toast message="Agregado" action="add" />);
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('toast--add');
  });

  it('debe renderizar el símbolo "-" para acciones distintas a "add"', () => {
    render(<Toast message="Eliminado" action="remove" />);
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  it('debe ejecutar onClose al hacer click', () => {
    const mockClose = vi.fn();
    render(<Toast message="Test" onClose={mockClose} />);
    
    fireEvent.click(screen.getByRole('status'));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});