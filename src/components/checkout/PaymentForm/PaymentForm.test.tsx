import React from 'react';
import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PaymentStep from './PaymentForm.js';

describe('PaymentStep Full Coverage', () => {
  const mockFormData = { cardNumber: '', expiry: '', cvc: '' };
  const setFormData = vi.fn();
  const setErrors = vi.fn();
  const onNext = vi.fn();
  const onBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  const getValueFromUpdater = (mockFn: any, prevState: any = {}) => {
    const lastCall = mockFn.mock.calls.at(-1);
    if (!lastCall) return null;
    const updater = lastCall[0];
    return typeof updater === 'function' ? updater(prevState) : updater;
  };

  it('debe limpiar el error de un campo al escribir', () => {
    const errorsInitial = { cardNumber: 'Error' };
    render(
      <PaymentStep 
        formData={mockFormData} 
        setFormData={setFormData}
        errors={errorsInitial} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { name: 'cardNumber', value: '4' } });

    const result = getValueFromUpdater(setErrors, errorsInitial);
    expect(result.cardNumber).toBe(""); 
  });

  it('debe validar errores de longitud mínima', () => {
    const shortData = { cardNumber: '123', expiry: '12', cvc: '1' };
    render(
      <PaymentStep 
        formData={shortData} 
        setFormData={setFormData}
        errors={{}} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Confirm and Pay/i }));
    
    expect(setErrors).toHaveBeenCalledWith({
      cardNumber: "Incomplete card number",
      expiry: "Invalid expiry date",
      cvc: "Invalid CVC"
    });
  });

  it('debe renderizar los mensajes de error en el DOM', () => {
    const activeErrors = {
      cardNumber: "Card Error Msg",
      expiry: "Expiry Error Msg",
      cvc: "CVC Error Msg"
    };

    render(
      <PaymentStep 
        formData={mockFormData} 
        setFormData={setFormData}
        errors={activeErrors} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    expect(screen.getByText("Card Error Msg")).toBeInTheDocument();
    expect(screen.getByText("Expiry Error Msg")).toBeInTheDocument();
    expect(screen.getByText("CVC Error Msg")).toBeInTheDocument();
    
    expect(screen.getByLabelText(/Card Number/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('debe formatear CVC eliminando no numéricos', () => {
    render(
      <PaymentStep formData={mockFormData} setFormData={setFormData} errors={{}} setErrors={setErrors} onNext={onNext} onBack={onBack} />
    );
    fireEvent.change(screen.getByLabelText(/CVC/i), { target: { name: 'cvc', value: '12a' } });
    
    const result = getValueFromUpdater(setFormData, mockFormData);
    expect(result.cvc).toBe('12');
  });

  it('debe permitir avanzar si la validación pasa', () => {
    const validData = { cardNumber: '1111 1111 1111 1111', expiry: '12/25', cvc: '123' };
    render(
      <PaymentStep formData={validData} setFormData={setFormData} errors={{}} setErrors={setErrors} onNext={onNext} onBack={onBack} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Confirm and Pay/i }));
    expect(onNext).toHaveBeenCalled();
  });
});