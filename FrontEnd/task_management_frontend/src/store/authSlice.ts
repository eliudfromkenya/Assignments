import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login as authLoginService, register as authRegisterService } from '../services/authentiocationService';
import { LoginFormData } from '../types/LoginFormData';
import { RegisterFormData } from '../types/RegistrationFormData';
import { User } from '../types/User';
import { showSuccessToast, showErrorToast, showLoadingToast, updateToast } from '../utils/toast';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Helper to decode token and set user
const decodeTokenAndSetUser = (token: string | null): User | null => {
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return {
        id: parseInt(decoded.nameid),
        email: decoded.email,
        username: decoded.username || '',
        role: decoded.role === 'ADMIN' ? 'ADMIN' : 'USER',
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      localStorage.removeItem('token');
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

// Initialize user from token if present on app load
initialState.user = decodeTokenAndSetUser(initialState.token);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginFormData, { rejectWithValue }) => {
    const toastId = showLoadingToast('Logging in...');
    try {
      const response = await authLoginService(email, password);
      localStorage.setItem('token', response.token);
      updateToast(toastId, 'success', 'Logged in successfully!');
      return response.token;
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      updateToast(toastId, 'error', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterFormData, { rejectWithValue }) => {
    const toastId = showLoadingToast('Registering account...');
    try {
      await authRegisterService(userData);
      updateToast(toastId, 'success', 'Account created successfully! Please log in.');
      return true; // Indicate success
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed';
      updateToast(toastId, 'error', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      showSuccessToast('Logged out successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        state.user = decodeTokenAndSetUser(action.payload); // Decode and set user from the new token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
