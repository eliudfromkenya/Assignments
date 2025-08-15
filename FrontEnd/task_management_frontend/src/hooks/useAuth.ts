import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logout } from '../store/authSlice';
import { RootState, AppDispatch } from '../store';
import { RegisterFormData } from '../types/RegistrationFormData';
import { User } from '../types/User';

// Define the return type of the useAuth hook
interface UseAuthHookType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterFormData) => Promise<void>;
    logout: () => void;
    authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    authError: string | null;
}

export const useAuth = (): UseAuthHookType => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const authError = useSelector((state: RootState) => state.auth.error);

    const handleLogin = async (email: string, password: string) => {
        const resultAction = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(resultAction)) {
            navigate('/dashboard');
        } else {
            // Error handled by thunk, re-throw if component needs to catch
            throw new Error(authError || 'Login failed');
        }
    };

    const handleRegister = async (userData: RegisterFormData) => {
        const resultAction = await dispatch(registerUser(userData));
        if (registerUser.fulfilled.match(resultAction)) {
            navigate('/login');
        } else {
            // Error handled by thunk, re-throw if component needs to catch
            throw new Error(authError || 'Registration failed');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return {
        user,
        token,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        authStatus,
        authError,
    };
};
