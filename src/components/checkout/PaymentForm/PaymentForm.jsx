const PaymentStep = ({ formData, setFormData, errors, setErrors, onNext, onBack }) => {
  
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    } else if (name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else if (name === 'cvc') {
      value = value.replace(/\D/g, '');
    }

    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.cardNumber || formData.cardNumber.length < 19) tempErrors.cardNumber = "Incomplete card number";
    if (!formData.expiry || formData.expiry.length < 5) tempErrors.expiry = "Invalid expiry date";
    if (!formData.cvc || formData.cvc.length < 3) tempErrors.cvc = "Invalid CVC";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <section className="checkout-step">
      <h2 className="checkout-step__title">Payment</h2>
      <form onSubmit={handleSubmit} className="checkout-form" noValidate>
        
        <div className="checkout-form__group">
          <label htmlFor="cardNumber" className="checkout-form__label">Card Number</label>
          <input 
            id="cardNumber"
            name="cardNumber" 
            autocomplete="cc-number"
            type="text" 
            inputMode="numeric" 
            placeholder="0000 0000 0000 0000" 
            autoComplete="cc-number"
            value={formData.cardNumber} 
            onChange={handleChange}
            maxLength="19" 
            className={errors.cardNumber ? 'is-invalid' : ''}
            aria-invalid={errors.cardNumber ? "true" : "false"}
            aria-describedby={errors.cardNumber ? "card-error" : undefined}
            required
          />
          {errors.cardNumber && <span id="card-error" className="error-msg" role="alert">{errors.cardNumber}</span>}
        </div>

        <div className="checkout-form__row">
          <div className="checkout-form__group">
            <label htmlFor="expiry" className="checkout-form__label">Expiry Date</label>
            <input 
              id="expiry"
              name="expiry" 
              autocomplete="cc-exp"
              type="text" 
              inputMode="numeric"
              placeholder="MM/YY" 
              autoComplete="cc-exp"
              value={formData.expiry} 
              onChange={handleChange}
              maxLength="5" 
              className={errors.expiry ? 'is-invalid' : ''}
              aria-invalid={errors.expiry ? "true" : "false"}
              aria-describedby={errors.expiry ? "expiry-error" : undefined}
              required
            />
            {errors.expiry && <span id="expiry-error" className="error-msg" role="alert">{errors.expiry}</span>}
          </div>
          <div className="checkout-form__group">
            <label htmlFor="cvc" className="checkout-form__label">CVC</label>
            <input 
              id="cvc"
              name="cvc" 
              autocomplete="cc-csc"
              type="text" 
              inputMode="numeric"
              placeholder="123" 
              autoComplete="cc-csc"
              value={formData.cvc} 
              onChange={handleChange}
              maxLength="3" 
              className={errors.cvc ? 'is-invalid' : ''}
              aria-invalid={errors.cvc ? "true" : "false"}
              aria-describedby={errors.cvc ? "cvc-error" : undefined}
              required
            />
            {errors.cvc && <span id="cvc-error" className="error-msg" role="alert">{errors.cvc}</span>}
          </div>
        </div>

        <div className="checkout-form__actions">
          <button type="submit" className="checkout-page__btn">Confirm and Pay</button>
          <button 
            type="button" 
            className="checkout-page__back-link" 
            onClick={onBack}
            aria-label="Return to shipping information"
          >
            Back to shipping info
          </button>
        </div>
      </form>
    </section>
  );
};

export default PaymentStep;