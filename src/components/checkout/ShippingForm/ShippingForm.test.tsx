import React from 'react';
import { render, screen, cleanup, userEvent } from '../../../test/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ShippingForm from './ShippingForm';

describe('ShippingForm 100% Coverage', () => {
  const emptyData = { name: '', lastName: '', email: '', address: '', city: '', zip: '' };
  
  const setFormData = vi.fn((updater) => {
    if (typeof updater === 'function') updater(emptyData);
  });
  const setErrors = vi.fn((updater) => {
    if (typeof updater === 'function') updater({});
  });
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('actualizar formData y manejar la lógica de limpieza de errores', async () => {
    const user = userEvent.setup();
    const errorsInitial = { name: 'Required' };
    
    render(
      <ShippingForm 
        formData={emptyData} 
        setFormData={setFormData} 
        errors={errorsInitial} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    const nameInput = screen.getByLabelText(/First Name/i);
    await user.type(nameInput, 'S');

    expect(setFormData).toHaveBeenCalled();
    expect(setErrors).toHaveBeenCalled();
  });

  it('actualizar formData sin limpiar errores si no los hay', async () => {
    const user = userEvent.setup();
    
    render(
      <ShippingForm 
        formData={emptyData} 
        setFormData={setFormData} 
        errors={{}} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    const lastNameInput = screen.getByLabelText(/Last Name/i);
    await user.type(lastNameInput, 'C');

    expect(setFormData).toHaveBeenCalled();
    expect(setErrors).not.toHaveBeenCalled();
  });

  it('disparar todas las validaciones de error y retornar false', async () => {
    const user = userEvent.setup();
    const invalidData = { 
      name: '  ',
      lastName: '', 
      email: 'invalid-email', 
      address: '', 
      city: '', 
      zip: 'abc' 
    };

    render(
      <ShippingForm 
        formData={invalidData} 
        setFormData={setFormData} 
        errors={{}} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    const submitBtn = screen.getByRole('button', { name: /continue to payment/i });
    await user.click(submitBtn);

    expect(setErrors).toHaveBeenCalledWith({
      name: "Required",
      lastName: "Required",
      email: "Invalid email",
      address: "Address required",
      city: "Required",
      zip: "Required"
    });
    expect(onNext).not.toHaveBeenCalled();
  });

  it('debe renderizar visualmente los bloques de error y atributos ARIA', () => {
    const allErrors = {
      name: 'Err1',
      lastName: 'Err2',
      email: 'Err3',
      address: 'Err4',
      city: 'Err5',
      zip: 'Err6'
    };

    render(
      <ShippingForm 
        formData={emptyData} 
        setFormData={setFormData} 
        errors={allErrors} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    Object.values(allErrors).forEach(msg => {
      expect(screen.getByText(msg)).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('debe llamar a onNext si la validación es exitosa', async () => {
    const user = userEvent.setup();
    const validData = {
      name: 'Sara',
      lastName: 'Cruz',
      email: 'sara@example.com',
      address: 'Calle Mayor 1',
      city: 'Madrid',
      zip: '28001'
    };

    render(
      <ShippingForm 
        formData={validData} 
        setFormData={setFormData} 
        errors={{}} 
        setErrors={setErrors} 
        onNext={onNext} 
      />
    );

    await user.click(screen.getByRole('button', { name: /continue to payment/i }));
    expect(onNext).toHaveBeenCalled();
  });
});