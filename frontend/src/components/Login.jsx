// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { login, user, error, clearError } = useAuth();
//   const navigate = useNavigate();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/dashboard');
//     }
//   }, [user, navigate]);

//   // Clear errors when component mounts or form changes
//   useEffect(() => {
//   clearError();
// }, []); // ✅ runs only once on mount


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const result = await login(formData.email, formData.password);
    
//     if (result.success) {
//       navigate('/dashboard');
//     }
    
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Login to TrackItDown</h2>
//         <p className="auth-subtitle">Find your lost items or help others find theirs</p>
        
//         {error && (
//           <div className="error-message">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//               disabled={isSubmitting}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Enter your password"
//               disabled={isSubmitting}
//               minLength="6"
//             />
//           </div>

//           <button 
//             type="submit" 
//             className="auth-button"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>
//             Don't have an account? 
//             <Link to="/register" className="auth-link"> Sign up here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Clear errors when component mounts or form changes
  useEffect(() => {
    clearError();
  }, []); // ✅ runs only once on mount

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-140px)] p-8">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">Login to TrackItDown</h2>
        <p className="text-center text-gray-600 mb-8 text-sm">Find your lost items or help others find theirs</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 px-3 py-3 rounded-md mb-4 border border-red-200 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
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
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3.5 rounded-md text-base font-medium cursor-pointer transition-all duration-200 mb-4 hover:shadow-lg hover:shadow-purple-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:animate-pulse"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account? 
            <Link to="/register" className="text-indigo-500 font-medium hover:underline"> Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;