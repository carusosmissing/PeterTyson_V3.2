import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/api_slice';
import authReducer from './slices/auth_slice';
import userReducer from './slices/user_slice';
import onboardingReducer from './slices/onboarding_slice';
import appReducer from './slices/app_slice';
import messagingReducer from './slices/messaging_slice';
import eventsReducer from './slices/events_slice';
import shrineReducer from './slices/shrine_slice';
import searchReducer from './slices/search_slice';

export const store = configureStore({
  reducer: {
    // RTK Query API slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    
    // Core app slices
    auth: authReducer,
    user: userReducer,
    onboarding: onboardingReducer,
    app: appReducer,
    
    // Feature slices
    messaging: messagingReducer,
    events: eventsReducer,
    shrine: shrineReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // Ignore these action types
          'persist/PERSIST',
          'persist/REHYDRATE',
        ],
      },
    }).concat(apiSlice.middleware),
  devTools: __DEV__,
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 