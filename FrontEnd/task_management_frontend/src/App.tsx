import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthenticationContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/RegisterComponent';
import ProtectedRoute from './layout';
import TaskMainPage from './components/TaskMainPage';
import Login from './components/Login';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="container mx-auto px-4 py-6">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <TaskMainPage />
                </ProtectedRoute>
              } />
              
              {/* Redirect to dashboard for authenticated users, home for others */}
              <Route path="*" element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          <footer className="bg-white border-t border-gray-200 py-6">
            <div className="container mx-auto px-4 text-center text-gray-500">
              <p>© {new Date().getFullYear()} Task Management System. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
