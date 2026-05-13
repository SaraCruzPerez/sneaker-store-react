import React from 'react';
import { render, screen, cleanup, fireEvent, act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { NotificationProvider, useNotification } from './NotificationContext.js';

vi.mock("../components/common/Toast/Toast.js", () => ({
  default: ({ onClose, message }: any) => (
    <div data-testid="toast-mock">
      {message}
      <button 
        aria-label="Close" 
        onClick={() => {
          onClose(); 
          onClose(); 
        }}
      >X</button>
    </div>
  )
}));

const TestComponent = () => {
  const { showNotification } = useNotification();
  return <button onClick={() => showNotification('Test message')}>Show</button>;
};

describe('NotificationContext Full Coverage', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('debe llegar al 100% de branches en la línea 20 (Doble llamada)', () => {
    render(<NotificationProvider><TestComponent /></NotificationProvider>);
    
    fireEvent.click(screen.getByText('Show'));    
    fireEvent.click(screen.getByLabelText('Close'));

    expect(screen.queryByTestId('toast-mock')).not.toBeInTheDocument();
  });

  it('debe cubrir el auto-ocultado por timer', () => {
    vi.useFakeTimers();
    render(<NotificationProvider><TestComponent /></NotificationProvider>);
    fireEvent.click(screen.getByText('Show'));
    
    act(() => { 
      vi.advanceTimersByTime(1000); 
    });
    
    expect(screen.queryByTestId('toast-mock')).not.toBeInTheDocument();
  });

  it('debe limpiar el timer al desmontar', () => {
    const spy = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<NotificationProvider><TestComponent /></NotificationProvider>);
    fireEvent.click(screen.getByText('Show'));
    unmount();
    
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('debe dar error si se usa fuera del provider (CORREGIDO)', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useNotification())).toThrow("useNotification must be used within a NotificationProvider");
    
    consoleSpy.mockRestore();
  });
  
  it('debe limpiar timer si se llama a showNotification dos veces (Línea 30)', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(window, 'clearTimeout');
    render(<NotificationProvider><TestComponent /></NotificationProvider>);
    
    fireEvent.click(screen.getByText('Show'));
    fireEvent.click(screen.getByText('Show')); 
    
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});