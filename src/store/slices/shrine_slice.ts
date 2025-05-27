import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { ShrineState } from '../types';

const initialState: ShrineState = {
  content: [],
  userShrines: [],
  currentShrine: null,
  interactions: {
    likes: 0,
    shares: 0,
    comments: [],
  },
  isLoading: false,
  error: null,
};

const shrineSlice = createSlice({
  name: 'shrine',
  initialState,
  reducers: {
    setCurrentShrine: (state, action: PayloadAction<any | null>) => {
      state.currentShrine = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.getShrineContent.matchFulfilled,
        (state, action) => {
          state.content = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const { setCurrentShrine, clearError } = shrineSlice.actions;
export default shrineSlice.reducer; 