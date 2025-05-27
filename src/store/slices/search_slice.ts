import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { SearchState } from '../types';

const initialState: SearchState = {
  query: '',
  results: {
    users: [],
    events: [],
    content: [],
  },
  filters: {
    type: 'all',
    category: null,
  },
  history: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.history.includes(query)) {
        state.history.unshift(query);
        if (state.history.length > 10) {
          state.history = state.history.slice(0, 10);
        }
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.search.matchFulfilled,
        (state, action) => {
          state.results = {
            users: action.payload.filter((item: any) => item.type === 'user'),
            events: action.payload.filter((item: any) => item.type === 'event'),
            content: action.payload.filter((item: any) => item.type === 'content'),
          };
          state.isLoading = false;
        }
      );
  },
});

export const { setQuery, addToHistory, clearHistory, clearError } = searchSlice.actions;
export default searchSlice.reducer; 