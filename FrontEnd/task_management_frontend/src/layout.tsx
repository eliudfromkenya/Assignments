import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthenticationContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: 'USER' | 'ADMIN';
}

const ProtectedRoute = ({ children, requiredRole = 'USER' }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole === 'ADMIN' && user.role !== 'ADMIN') {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
