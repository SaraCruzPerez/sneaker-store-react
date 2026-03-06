const ShippingForm = ({ formData, setFormData, errors, setErrors, onNext }) => {
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) tempErrors.name = "Required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Required";
    if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email";
    if (!formData.address.trim()) tempErrors.address = "Address required";
    if (!formData.city.trim()) tempErrors.city = "Required";   
    if (!/^\d{5}$/.test(formData.zip)) tempErrors.zip = "Required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <section className="checkout-step">
      <h2 className="checkout-step__title">Shipping Details</h2>

      <form onSubmit={handleSubmit} className="checkout-form" noValidate>  
        <div className="checkout-form__row">
          <div className="checkout-form__group">
            <label className="checkout-form__label">First Name</label>
            <input 
              name="name" type="text" placeholder="Sara" 
              value={formData.name} onChange={handleChange}
              className={errors.name ? 'is-invalid' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="checkout-form__group">
            <label className="checkout-form__label">Last Name</label>
            <input 
              name="lastName" type="text" placeholder="Cruz" 
              value={formData.lastName} onChange={handleChange}
              className={errors.lastName ? 'is-invalid' : ''}
            />
            {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
          </div>
        </div>

        <div className="checkout-form__group">
          <label className="checkout-form__label">Email Address</label>
          <input 
            name="email" type="email" placeholder="sara@example.com" 
            value={formData.email} onChange={handleChange}
            className={errors.email ? 'is-invalid' : ''}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="checkout-form__group">
          <label className="checkout-form__label">Shipping Address</label>
          <input 
            name="address" type="text" placeholder="Plaza del 2 de Mayo" 
            value={formData.address} onChange={handleChange}
            className={errors.address ? 'is-invalid' : ''}
          />
          {errors.address && <span className="error-msg">{errors.address}</span>}
        </div>

        <div className="checkout-form__row">
          <div className="checkout-form__group">
            <label className="checkout-form__label">City</label>
            <input 
              name="city" type="text" placeholder="Madrid" 
              value={formData.city} onChange={handleChange}
              className={errors.city ? 'is-invalid' : ''}
            />
            {errors.city && <span className="error-msg">{errors.city}</span>}
          </div>

          <div className="checkout-form__group">
            <label className="checkout-form__label">Zip Code</label>
            <input 
              name="zip" type="text" placeholder="28004" 
              maxLength="5"
              value={formData.zip} onChange={handleChange}
              className={errors.zip ? 'is-invalid' : ''}
            />
            {errors.zip && <span className="error-msg">{errors.zip}</span>}
          </div>
        </div>

        <div className="checkout-form__actions">
          <button type="submit" className="checkout-page__btn">Continue to Payment</button>
        </div>
      </form>
    </section>
  );
};

export default ShippingForm;