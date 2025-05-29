import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { UserState } from '../types';

const initialState: UserState = {
  profile: {
    id: '1',
    username: 'Pete',
    handle: '@petertyson',
    avatar: 'pete', // This will reference Assets.Avatars.pete or custom URI
    avatarType: 'asset', // 'asset' for preset avatars, 'custom' for uploaded images
    displayName: 'Pete',
    email: 'demo@example.com',
    bio: 'All I need is 3 mothafuckas...',
    genres: [], // Top 3 favorite genres
    sports: [], // Top 3 favorite sports
    bannerImage: null, // Custom banner image URI or null for default
    bannerType: 'default', // 'default' or 'custom'
    backgroundColor: '#000000', // Default background color
  },
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
    // Update user profile
    updateProfile: (state, action: PayloadAction<Partial<{
      username: string;
      handle: string;
      avatar: string;
      avatarType: 'asset' | 'custom';
      displayName: string;
      email: string;
      bio: string;
      genres: string[];
      sports: string[];
      bannerImage: string | null;
      bannerType: 'default' | 'custom';
      backgroundColor: string;
    }>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },

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
  updateProfile,
  updatePreferences,
  setCategory,
  toggleNotifications,
  setTheme,
  clearUserData,
  clearError,
} = userSlice.actions;

export default userSlice.reducer; 