import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { EventsState } from '../types';

const initialState: EventsState = {
  events: [],
  featuredEvents: [],
  currentEvent: null,
  filters: {
    category: null,
    location: null,
    dateRange: { start: null, end: null },
  },
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<any | null>) => {
      state.currentEvent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.getEvents.matchFulfilled,
        (state, action) => {
          state.events = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const { setCurrentEvent, clearError } = eventsSlice.actions;
export default eventsSlice.reducer; 