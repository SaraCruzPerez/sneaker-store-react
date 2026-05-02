import React from 'react';
import { render, screen, act, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { NotificationProvider, useNotification } from './NotificationContext.js';

vi.mock("../components/common/Toast/Toast.js", () => ({
  default: ({ onClose, message }: any) => (
    <div data-testid="toast-mock">
      {message}
      <button onClick={onClose} aria-label="close-toast">X</button>
    </div>
  )
}));

const TestComponent = () => {
  const { showNotification } = useNotification();
  return (
    <button onClick={() => showNotification('Test Message', 'add')}>
      Disparar
    </button>
  );
};

describe('NotificationContext Full Coverage', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('debe mostrar la notificación al disparar el evento', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /disparar/i }));
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('debe cubrir la línea 34: cerrar la notificación manualmente (onClose)', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /disparar/i }));
    
    const closeBtn = screen.getByLabelText('close-toast');
    
    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
  });

  it('debe cubrir el temporizador de desaparición (línea 25-27)', () => {
    vi.useFakeTimers();
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /disparar/i }));
    
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
  });

  it('debe cubrir la línea 44: lanzar error si se usa fuera del Provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const ComponentOutside = () => {
      useNotification();
      return null;
    };

    expect(() => render(<ComponentOutside />)).toThrow(
      "useNotification must be used within a NotificationProvider"
    );

    consoleSpy.mockRestore();
  });
});