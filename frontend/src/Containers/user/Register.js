import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Containers/user/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNumber);
  };

  const validatePassword = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;

    const isLowerCaseValid = lowercaseRegex.test(password);
    const isUpperCaseValid = uppercaseRegex.test(password);
    const isNumberValid = numberRegex.test(password);

    return {
      isLowerCaseValid,
      isUpperCaseValid,
      isNumberValid,
      isLengthValid: password.length >= 6,
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific validation error when the input changes
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    // Validate input based on its name
    switch (name) {
      case 'email':
        if (!validateEmail(value)) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Invalid email format',
          }));
        }
        break;
      case 'mobileNumber':
        if (value && !validateMobileNumber(value)) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber: 'Invalid mobile number format',
          }));
        }
        break;
      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isLowerCaseValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must contain at least one lowercase letter',
          }));
        } else if (!passwordValidation.isUpperCaseValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must contain at least one uppercase letter',
          }));
        } else if (!passwordValidation.isNumberValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must contain at least one number',
          }));
        } else if (!passwordValidation.isLengthValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must be at least 6 characters long',
          }));
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: 'Passwords do not match',
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Validate mobile number
    if (formData.mobileNumber && !validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number format';
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isLowerCaseValid) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!passwordValidation.isUpperCaseValid) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!passwordValidation.isNumberValid) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!passwordValidation.isLengthValid) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // If there are errors, update the state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    // If all validations pass, you can proceed with form submission
    console.log('Form submitted:', formData);

    // Additional logic for form submission (e.g., API call) can be added here
  };

  return (
    <div>
      <div className='signup template d-flex justify-content-center align-items-center vh-100 ' style={{ backgroundColor: '#EFD3B5' }}>
        <div className='form_container p-5 rounded bg-white'>
          <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Sign Up</h3>
            <div className='mb-3'>
              <input type="email" name="email" placeholder='Enter Email' className='form-control' onChange={handleInputChange} />
              {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
            </div>
            <div className='mb-3'>
              <input type="text" name="mobileNumber" placeholder='Enter phone number' className='form-control' onChange={handleInputChange} />
              {validationErrors.mobileNumber && <p className="error-message">{validationErrors.mobileNumber}</p>}
            </div>
            <div className='mb-3'>
              <input type="password" name="password" placeholder='Enter password' className='form-control' onChange={handleInputChange} />
              {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}
            </div>
            <div className='mb-3'>
              <input type="password" name="confirmPassword" placeholder='Confirm Password' className='form-control' onChange={handleInputChange} />
              {validationErrors.confirmPassword && <p className="error-message">{validationErrors.confirmPassword}</p>}
            </div>
            <div className='mb-2'>
              <input type='checkbox' className='custom-control custom-checkbox' id='check' />
              <label htmlFor='check' className='custom-input-label ms-2'>
                Remember me
              </label>
            </div>
            <div className='d-grid mt-2'>
              <button type="submit" className='btn btn-primary mb-3'>Sign Up</button>
            </div>
            <p className='text-end mt-2'>
              <Link to='/login' className='ms-2'>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
