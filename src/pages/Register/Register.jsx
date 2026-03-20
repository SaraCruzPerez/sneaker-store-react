import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const { login } = useUser();
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      login({ name, email });
      navigate("/");
    }
  };

  return (
    <main className="register">
      <div className="register__card">
        <header className="register__header">
          <h1 className="register__title">
            Create <span className="register__title-orange">Account</span>
          </h1>
          <p className="register__subtitle">Unlock your style journey</p>
        </header>

        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <div className="register__input-group">
            <label htmlFor="name" className="register__label">Full Name</label>
            <input 
              id="name"
              name="name" 
              autocomplete="name"
              className={`register__input ${errors.name ? 'register__input-error' : ''}`}
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Sara Cruz"
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && <span id="name-error" className="register__error-msg" role="alert">{errors.name}</span>}
          </div>

          <div className="register__input-group">
            <label htmlFor="email" className="register__label">Email Address</label>
            <input 
              id="email"
              className={`register__input ${errors.email ? 'register__input-error' : ''}`}
              name="email"
              autocomplete="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="sara@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && <span id="email-error" className="register__error-msg" role="alert">{errors.email}</span>}
          </div>

          <button type="submit" className="register__button">
            LET'S GO!
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;