import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from './types/AuthContextType';
import { User } from './types/User';
import { RegisterFormData } from './types/RegistrationFormData';
import { login, register } from './serives/authentiocationService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    id: parseInt(decoded.nameid),
                    email: decoded.email,
                    username: decoded.username || '',
                    role: decoded.role === 'ADMIN' ? 'ADMIN' : 'USER',
                    createdAt: new Date().toISOString()
                });
            } catch (error) {
                console.error('Failed to decode token:', error);
                logout();
            }
        }
    }, [token]);

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            localStorage.setItem('token', response.token);
            setToken(response.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const handleRegister = async (userData: RegisterFormData) => {
        try {
            await register(userData);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login: handleLogin,
            register: handleRegister,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

  
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
