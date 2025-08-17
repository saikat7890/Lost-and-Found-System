// import React from 'react';

// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link to="/" className="nav-logo">
//           TrackItDown
//         </Link>
        
//         <div className="nav-links">
//           {user ? (
//             <>
//               <span className="nav-user">Welcome, {user.name}</span>
//               <Link to="/dashboard" className="nav-link">Dashboard</Link>
//               <button onClick={handleLogout} className="nav-button">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="nav-link">Login</Link>
//               <Link to="/register" className="nav-button">Sign Up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">TrackItDown</Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.name}</span>
              <Link to="/dashboard" className="px-3 py-1 rounded hover:bg-white/10">Dashboard</Link>
              <button 
                onClick={handleLogout} 
                className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded hover:bg-white/10">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
