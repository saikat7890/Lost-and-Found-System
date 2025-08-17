// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// const Dashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Welcome to TrackItDown</h1>
//         <p>Hello {user?.name}! You're successfully logged in.</p>
//       </div>
      
//       <div className="dashboard-content">
//         <div className="dashboard-card">
//           <h3>🔍 Module 1: Authentication Complete!</h3>
//           <p>Your login system is now ready. Here's what's working:</p>
//           <ul>
//             <li>✅ User Registration with validation</li>
//             <li>✅ Secure Login with JWT tokens</li>
//             <li>✅ Protected routes</li>
//             <li>✅ User session management</li>
//             <li>✅ Password hashing with bcrypt</li>
//           </ul>
//         </div>

//         <div className="dashboard-card">
//           <h3>👤 Your Account</h3>
//           <p><strong>Name:</strong> {user?.name}</p>
//           <p><strong>Email:</strong> {user?.email}</p>
//           <p><strong>Role:</strong> {user?.role}</p>
//           <p><strong>Account Created:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
//         </div>

//         <div className="dashboard-card">
//           <h3>🚀 Coming Soon</h3>
//           <p>The following modules will be added in upcoming weeks:</p>
//           <ul>
//             <li>📝 Post Lost/Found Items (Module 2)</li>
//             <li>🔎 Search & Filter Items (Module 3)</li>
//             <li>✋ Claim Verification System (Module 4)</li>
//             <li>👨‍💼 Admin Dashboard (Module 5)</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to TrackItDown</h1>
        <p className="text-gray-600 text-lg">Hello {user?.name}! You're successfully logged in.</p>
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🔍 Module 1: Authentication Complete!</h3>
          <p className="text-gray-600 mb-3">Your login system is now ready. Here's what's working:</p>
          <ul className="divide-y divide-gray-100">
            <li className="py-2 text-gray-700">✅ User Registration with validation</li>
            <li className="py-2 text-gray-700">✅ Secure Login with JWT tokens</li>
            <li className="py-2 text-gray-700">✅ Protected routes</li>
            <li className="py-2 text-gray-700">✅ User session management</li>
            <li className="py-2 text-gray-700">✅ Password hashing with bcrypt</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">👤 Your Account</h3>
          <p className="text-gray-600"><strong>Name:</strong> {user?.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
          <p className="text-gray-600"><strong>Role:</strong> {user?.role}</p>
          <p className="text-gray-600"><strong>Account Created:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🚀 Coming Soon</h3>
          <p className="text-gray-600 mb-3">The following modules will be added in upcoming weeks:</p>
          <ul className="divide-y divide-gray-100">
            <li className="py-2 text-gray-700">📝 Post Lost/Found Items (Module 2)</li>
            <li className="py-2 text-gray-700">🔎 Search & Filter Items (Module 3)</li>
            <li className="py-2 text-gray-700">✋ Claim Verification System (Module 4)</li>
            <li className="py-2 text-gray-700">👨‍💼 Admin Dashboard (Module 5)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
