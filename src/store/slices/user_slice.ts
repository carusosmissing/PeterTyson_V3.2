import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { UserState } from '../types';

const initialState: UserState = {
  profile: null,
  preferences: {
    category: null,
    notifications: true,
    theme: 'dark',
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Update user preferences
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    
    // Set user category (music/sports)
    setCategory: (state, action: PayloadAction<'music' | 'sports'>) => {
      state.preferences.category = action.payload;
    },
    
    // Toggle notifications
    toggleNotifications: (state) => {
      state.preferences.notifications = !state.preferences.notifications;
    },
    
    // Set theme
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.preferences.theme = action.payload;
    },
    
    // Clear user data
    clearUserData: (state) => {
      state.profile = null;
      state.preferences = {
        category: null,
        notifications: true,
        theme: 'dark',
      };
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle get user profile
    builder
      .addMatcher(
        apiSlice.endpoints.getUserProfile.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getUserProfile.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.profile = action.payload;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getUserProfile.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to load profile';
        }
      );

    // Handle update user profile
    builder
      .addMatcher(
        apiSlice.endpoints.updateUserProfile.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.updateUserProfile.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.profile = { ...state.profile, ...action.payload };
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.updateUserProfile.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to update profile';
        }
      );
  },
});

export const {
  updatePreferences,
  setCategory,
  toggleNotifications,
  setTheme,
  clearUserData,
  clearError,
} = userSlice.actions;

export default userSlice.reducer; 