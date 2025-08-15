import { RegisterFormData } from "../types/RegistrationFormData";

const API_URL = 'https://localhost:7195/api';

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        role: string;
    };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email, password }),
    });

    if(response.status === 401) 
        throw new Error('Invalid email or password');
    else if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }
    const re = await response.json();

    localStorage.setItem('token', re.token);

    return re;
};

export const register = async (userData: RegisterFormData): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message || 'Registration failed');
    }
};

export const logout = async (): Promise<void> => {

    localStorage.removeItem('token');
};
