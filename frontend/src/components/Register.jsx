import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { register, user, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Clear errors when form changes
  useEffect(() => {
    clearError();
    setValidationErrors({});
  }, []); // ✅ empty dependency array to avoid infinite re-renders

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-140px)] p-8">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">Join TrackItDown</h2>
        <p className="text-center text-gray-600 mb-8 text-sm">Create your account to start finding lost items</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 px-3 py-3 rounded-md mb-4 border border-red-200 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              disabled={isSubmitting}
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            {validationErrors.name && (
              <span className="text-red-500 text-xs block mt-1">{validationErrors.name}</span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              disabled={isSubmitting}
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            {validationErrors.email && (
              <span className="text-red-500 text-xs block mt-1">{validationErrors.email}</span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              disabled={isSubmitting}
              minLength="6"
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            {validationErrors.password && (
              <span className="text-red-500 text-xs block mt-1">{validationErrors.password}</span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              disabled={isSubmitting}
              minLength="6"
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            {validationErrors.confirmPassword && (
              <span className="text-red-500 text-xs block mt-1">{validationErrors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3.5 rounded-md text-base font-medium cursor-pointer transition-all duration-200 mb-4 hover:shadow-lg hover:shadow-purple-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:animate-pulse"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account? 
            <Link to="/login" className="text-indigo-500 font-medium hover:underline"> Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;