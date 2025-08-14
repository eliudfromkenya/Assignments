import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import { AuthProvider } from './AuthenticationContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/RegisterComponent';
import ProtectedRoute from './layout';
import TaskMainPage from './components/TaskMainPage';
import UserManagementPage from './components/UserManagementPage'; // Import UserManagementPage
import NotFound from './NotFound';

// Component to handle scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-greenish-50 flex flex-col">
          <Navbar />

          <main className="flex-grow container mx-auto px-4 py-6">
            <ScrollToTop />
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
              <Route path="/admin/users" element={
                <ProtectedRoute requiredRole="ADMIN">
                  <UserManagementPage />
                </ProtectedRoute>
              } />

              {/* 404 Not Found route */}
              <Route path="/404" element={<NotFound />} />

              {/* Redirect to dashboard for authenticated users, home for others, or 404 for unknown paths */}
              <Route path="*" element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          <footer className="bg-white border-t border-greenish-100 py-6">
            <div className="container mx-auto px-4 text-center text-gray-500">
              <p>© {new Date().getFullYear()} Task Management System. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;