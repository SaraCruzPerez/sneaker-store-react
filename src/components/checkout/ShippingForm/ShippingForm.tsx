import React from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { ShippingData, ShippingErrors } from "../../../types/models.js";

interface ShippingFormProps {
  formData: ShippingData;
  setFormData: (data: ShippingData) => void;
  errors: ShippingErrors;
  setErrors: (errors: ShippingErrors) => void;
  onNext: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  onNext,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof ShippingErrors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = (): boolean => {
    let tempErrors: ShippingErrors = {};
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <section className="checkout-step">
      <h2 className="checkout-step__title">Shipping Details</h2>

      <form onSubmit={handleSubmit} className="checkout-form" noValidate>
        <div className="checkout-form__row">
          <div className="checkout-form__group">
            <label htmlFor="name" className="checkout-form__label">
              First Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Sara"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              className={errors.name ? "is-invalid" : ""}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <span id="name-error" className="error-msg" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="checkout-form__group">
            <label htmlFor="lastName" className="checkout-form__label">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Cruz"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              className={errors.lastName ? "is-invalid" : ""}
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              required
            />
            {errors.lastName && (
              <span id="lastName-error" className="error-msg" role="alert">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="checkout-form__group">
          <label htmlFor="email" className="checkout-form__label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            type="email"
            placeholder="sara@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "is-invalid" : ""}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && (
            <span id="email-error" className="error-msg" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="checkout-form__group">
          <label htmlFor="address" className="checkout-form__label">
            Shipping Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Plaza del 2 de Mayo"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            className={errors.address ? "is-invalid" : ""}
            aria-invalid={errors.address ? "true" : "false"}
            aria-describedby={errors.address ? "address-error" : undefined}
            required
          />
          {errors.address && (
            <span id="address-error" className="error-msg" role="alert">
              {errors.address}
            </span>
          )}
        </div>

        <div className="checkout-form__row">
          <div className="checkout-form__group">
            <label htmlFor="city" className="checkout-form__label">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Madrid"
              value={formData.city}
              onChange={handleChange}
              autoComplete="address-level2"
              className={errors.city ? "is-invalid" : ""}
              aria-invalid={errors.city ? "true" : "false"}
              aria-describedby={errors.city ? "city-error" : undefined}
              required
            />
            {errors.city && (
              <span id="city-error" className="error-msg" role="alert">
                {errors.city}
              </span>
            )}
          </div>

          <div className="checkout-form__group">
            <label htmlFor="zip" className="checkout-form__label">
              Zip Code
            </label>
            <input
              id="zip"
              name="zip"
              type="text"
              placeholder="28004"
              maxLength={5}
              value={formData.zip}
              onChange={handleChange}
              autoComplete="postal-code"
              className={errors.zip ? "is-invalid" : ""}
              aria-invalid={errors.zip ? "true" : "false"}
              aria-describedby={errors.zip ? "zip-error" : undefined}
              required
            />
            {errors.zip && (
              <span id="zip-error" className="error-msg" role="alert">
                {errors.zip}
              </span>
            )}
          </div>
        </div>

        <div className="checkout-form__actions">
          <button type="submit" className="checkout-page__btn">
            Continue to Payment
          </button>
        </div>
      </form>
    </section>
  );
};

export default ShippingForm;
