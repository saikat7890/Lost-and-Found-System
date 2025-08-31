import './App.css'
import {AuthProvider, useAuth} from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import PostItem from './components/PostItem';
import MyItems from './components/MyItems';
import ItemDetails from './components/ItemDetails';
import ItemList from './components/ItemList';
import Footer from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <>
    <AuthProvider>
      
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/items" element={<ItemList />} />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/post-item" 
                element={
                  <ProtectedRoute>
                    <PostItem />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-items" 
                element={
                  <ProtectedRoute>
                    <MyItems />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      
    </AuthProvider>
      
    </>
  )
}

export default App
