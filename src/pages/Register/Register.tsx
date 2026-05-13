import React, { useState } from "react";
import { useUser } from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";
import "./Register.css";

interface RegisterErrors {
  name?: string;
  email?: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<RegisterErrors>({});

  const { login } = useUser();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!name.trim()) newErrors.name = "Please enter your full name";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      login({ name: name.trim(), email: email.trim().toLowerCase() });
      navigate("/");
    }
  };

  const handleInputChange = (field: keyof RegisterErrors, value: string, setter: (v: string) => void) => {
    setter(value);
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <main className="register">
      <div className="register__card">
        <header className="register__header">
          <h1 className="register__title">Create <span className="register__title-orange">Account</span></h1>
          <p className="register__subtitle">Unlock your style journey</p>
        </header>

        <form className="register__form" onSubmit={handleSubmit} noValidate aria-label="Register form">
          <div className="register__input-group">
            <label htmlFor="name" className="register__label">Full Name</label>
            <input id="name" name="name" autoComplete="name" className={`register__input ${errors.name ? 'register__input-error' : ''}`} type="text" value={name} onChange={(e) => handleInputChange('name', e.target.value, setName)} placeholder="Sara Cruz" required aria-invalid={!!errors.name} />
            {errors.name && <span id="name-error" className="register__error-msg" role="alert">{errors.name}</span>}
          </div>

          <div className="register__input-group">
            <label htmlFor="email" className="register__label">Email Address</label>
            <input id="email" className={`register__input ${errors.email ? 'register__input-error' : ''}`} name="email" autoComplete="email" type="email" value={email} onChange={(e) => handleInputChange('email', e.target.value, setEmail)} placeholder="sara@example.com" required aria-invalid={!!errors.email} />
            {errors.email && <span id="email-error" className="register__error-msg" role="alert">{errors.email}</span>}
          </div>

          <button type="submit" className="register__button">LET'S GO!</button>
        </form>
      </div>
    </main>
  );
};

export default Register;