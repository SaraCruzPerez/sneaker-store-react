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
          <label className="checkout-form__label">Card Number</label>
          <input 
            name="cardNumber" type="text" placeholder="0000 0000 0000 0000" 
            value={formData.cardNumber} onChange={handleChange}
            maxLength="19" className={errors.cardNumber ? 'is-invalid' : ''}
          />
          {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
        </div>

        <div className="checkout-form__row">
          <div className="checkout-form__group">
            <label className="checkout-form__label">Expiry Date</label>
            <input 
              name="expiry" type="text" placeholder="MM/YY" 
              value={formData.expiry} onChange={handleChange}
              maxLength="5" className={errors.expiry ? 'is-invalid' : ''}
            />
            {errors.expiry && <span className="error-msg">{errors.expiry}</span>}
          </div>
          <div className="checkout-form__group">
            <label className="checkout-form__label">CVC</label>
            <input 
              name="cvc" type="text" placeholder="123" 
              value={formData.cvc} onChange={handleChange}
              maxLength="3" className={errors.cvc ? 'is-invalid' : ''}
            />
            {errors.cvc && <span className="error-msg">{errors.cvc}</span>}
          </div>
        </div>

        <div className="checkout-form__actions">
          <button type="submit" className="checkout-page__btn">Confirm and Pay</button>
          <button type="button" className="checkout-page__back-link" onClick={onBack}>
            Back to shipping info
          </button>
        </div>
      </form>
    </section>
  );
};

export default PaymentStep;