import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import Auth Context
import '../styles/auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth(); // Get register function from AuthContext

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  // ✅ Improved Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const success = await register(formData); // ✅ Get success status
      if (success) navigate('/profile'); // ✅ Navigate only if successful
      else setErrors({ form: 'Registration failed. Try again.' });
      setIsLoading(false);
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Create your PopX account</h1>

        {errors.form && <div className="error-message">{errors.form}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'input-error' : ''}
            />
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group radio-group">
            <label>Are you an Agency?*</label>
            <div className="radio-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="true"
                  checked={formData.isAgency === true}
                  onChange={() => setFormData({ ...formData, isAgency: true })}
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="false"
                  checked={formData.isAgency === false}
                  onChange={() => setFormData({ ...formData, isAgency: false })}
                />
                No
              </label>
            </div>
          </div>

          <button 
  type="submit" 
  className={`primary-button ${formData.email && formData.password ? "enabled" : ""}`}
  disabled={isLoading}
>
  {isLoading ? 'Creating Account...' : 'Create Account'}
</button>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
