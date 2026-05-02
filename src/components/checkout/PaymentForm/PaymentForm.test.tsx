import { render, screen, fireEvent, cleanup } from '../../../test/test-utils.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PaymentStep from '../PaymentForm/PaymentForm.js';

describe('PaymentStep Full Coverage Boost', () => {
  const mockFormData = { cardNumber: '', expiry: '', cvc: '' };
  const setFormData = vi.fn();
  const setErrors = vi.fn();
  const onNext = vi.fn();
  const onBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('debe cubrir todas las ramas de handleChange y el renderizado condicional', () => {
    const errorsState = {
      cardNumber: 'Incomplete card number',
      expiry: 'Invalid expiry date',
      cvc: 'Invalid CVC'
    };

    const { rerender } = render(
      <PaymentStep 
        formData={mockFormData} 
        setFormData={setFormData}
        errors={errorsState} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    expect(screen.getByText('Incomplete card number')).toBeInTheDocument();
    const cardInput = screen.getByLabelText(/Card Number/i);
    expect(cardInput).toHaveAttribute('aria-invalid', 'true');
    expect(cardInput).toHaveAttribute('aria-describedby', 'card-error');

    fireEvent.change(cardInput, { target: { name: 'cardNumber', value: '12345' } });
    expect(setFormData).toHaveBeenCalledWith(expect.objectContaining({ cardNumber: '1234 5' }));
    expect(setErrors).toHaveBeenCalled();

    const expiryInput = screen.getByLabelText(/Expiry Date/i);
    fireEvent.change(expiryInput, { target: { name: 'expiry', value: '122' } });
    expect(setFormData).toHaveBeenCalledWith(expect.objectContaining({ expiry: '12/2' }));

    const cvcInput = screen.getByLabelText(/CVC/i);
    fireEvent.change(cvcInput, { target: { name: 'cvc', value: '12' } });
    expect(setFormData).toHaveBeenCalled();

    rerender(
      <PaymentStep 
        formData={mockFormData} 
        setFormData={setFormData}
        errors={{}} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );
    expect(cardInput).toHaveAttribute('aria-invalid', 'false');
    expect(cardInput).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByText('Incomplete card number')).not.toBeInTheDocument();
  });

  it('debe cubrir las ramas de validación (campos vacios o nulos)', () => {
    render(
      <PaymentStep 
        formData={{ cardNumber: '', expiry: '', cvc: '' }} 
        setFormData={setFormData}
        errors={{}} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    fireEvent.click(screen.getByText(/Confirm and Pay/i));
    expect(setErrors).toHaveBeenCalledWith(expect.objectContaining({
      cardNumber: 'Incomplete card number',
      expiry: 'Invalid expiry date',
      cvc: 'Invalid CVC'
    }));
  });

  it('debe cubrir el formateo de expiry cuando el valor es corto (L33 else)', () => {
    render(
      <PaymentStep 
        formData={mockFormData} 
        setFormData={setFormData}
        errors={{}} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    const expiryInput = screen.getByLabelText(/Expiry Date/i);
    fireEvent.change(expiryInput, { target: { name: 'expiry', value: '1' } });
    expect(setFormData).toHaveBeenCalledWith(expect.objectContaining({ expiry: '1' }));
  });

  it('debe cubrir el éxito total de validación y onNext', () => {
    const validData = {
      cardNumber: '1234 5678 1234 5678',
      expiry: '12/28',
      cvc: '123'
    };

    render(
      <PaymentStep 
        formData={validData} 
        setFormData={setFormData}
        errors={{}} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    fireEvent.click(screen.getByText(/Confirm and Pay/i));
    expect(onNext).toHaveBeenCalled();
  });

  it('debe ejecutar onBack', () => {
    render(
      <PaymentStep 
        formData={mockFormData} 
        setFormData={setFormData}
        errors={{}} 
        setErrors={setErrors}
        onNext={onNext} 
        onBack={onBack}
      />
    );

    fireEvent.click(screen.getByText(/Back to shipping info/i));
    expect(onBack).toHaveBeenCalled();
  });
});