import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../types';

const initialState: AppState = {
  isInitialized: false,
  isOnline: true,
  notifications: [],
  modals: {
    isProfileModalOpen: false,
    isSettingsModalOpen: false,
    isEventModalOpen: false,
  },
  loading: {
    global: false,
    auth: false,
    data: false,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Set app initialization status
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    
    // Set online status
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    
    // Add notification
    addNotification: (state, action: PayloadAction<{
      type: 'info' | 'success' | 'warning' | 'error';
      title: string;
      message: string;
    }>) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(notification);
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    
    // Mark notification as read
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    
    // Remove notification
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    
    // Clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Mark all notifications as read
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    
    // Modal management
    openProfileModal: (state) => {
      state.modals.isProfileModalOpen = true;
    },
    
    closeProfileModal: (state) => {
      state.modals.isProfileModalOpen = false;
    },
    
    openSettingsModal: (state) => {
      state.modals.isSettingsModalOpen = true;
    },
    
    closeSettingsModal: (state) => {
      state.modals.isSettingsModalOpen = false;
    },
    
    openEventModal: (state) => {
      state.modals.isEventModalOpen = true;
    },
    
    closeEventModal: (state) => {
      state.modals.isEventModalOpen = false;
    },
    
    closeAllModals: (state) => {
      state.modals = {
        isProfileModalOpen: false,
        isSettingsModalOpen: false,
        isEventModalOpen: false,
      };
    },
    
    // Loading states
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.auth = action.payload;
    },
    
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.data = action.payload;
    },
    
    // Reset app state
    resetAppState: (state) => {
      state.notifications = [];
      state.modals = {
        isProfileModalOpen: false,
        isSettingsModalOpen: false,
        isEventModalOpen: false,
      };
      state.loading = {
        global: false,
        auth: false,
        data: false,
      };
    },
  },
});

export const {
  setInitialized,
  setOnlineStatus,
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearNotifications,
  markAllNotificationsAsRead,
  openProfileModal,
  closeProfileModal,
  openSettingsModal,
  closeSettingsModal,
  openEventModal,
  closeEventModal,
  closeAllModals,
  setGlobalLoading,
  setAuthLoading,
  setDataLoading,
  resetAppState,
} = appSlice.actions;

export default appSlice.reducer; 