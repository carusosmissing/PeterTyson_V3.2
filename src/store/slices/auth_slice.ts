import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Manual logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    // Clear auth error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Restore session from storage
    restoreSession: (state, action: PayloadAction<{
      user: any;
      token: string;
      refreshToken: string;
    }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    
    // Simple login for testing/demo purposes
    loginSuccess: (state, action: PayloadAction<{
      user?: any;
      token?: string;
      refreshToken?: string;
    }>) => {
      state.user = action.payload.user || { id: '1', name: 'Kevin', email: 'kevin@example.com' };
      state.token = action.payload.token || 'demo-token';
      state.refreshToken = action.payload.refreshToken || 'demo-refresh-token';
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addMatcher(
        apiSlice.endpoints.login.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.login.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.login.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Login failed';
        }
      );

    // Handle signup
    builder
      .addMatcher(
        apiSlice.endpoints.signUp.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.signUp.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.signUp.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Sign up failed';
        }
      );

    // Handle reset password
    builder
      .addMatcher(
        apiSlice.endpoints.resetPassword.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.resetPassword.matchFulfilled,
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.resetPassword.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Password reset failed';
        }
      );
  },
});

export const { logout, clearError, setLoading, restoreSession, loginSuccess } = authSlice.actions;
export default authSlice.reducer; 