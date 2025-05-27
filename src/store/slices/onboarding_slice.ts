import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { OnboardingState } from '../types';

const initialState: OnboardingState = {
  hasCompletedOnboarding: false,
  selectedCategory: null,
  currentStep: 0,
  totalSteps: 0,
  answers: [],
  isLoading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // Set selected category (music/sports/both)
    setSelectedCategory: (state, action: PayloadAction<'music' | 'sports' | 'both'>) => {
      state.selectedCategory = action.payload;
    },
    
    // Set current step
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    
    // Set total steps
    setTotalSteps: (state, action: PayloadAction<number>) => {
      state.totalSteps = action.payload;
    },
    
    // Go to next step
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      }
    },
    
    // Go to previous step
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    
    // Add or update answer
    addAnswer: (state, action: PayloadAction<{
      questionId: string;
      selectedOptions: string[];
    }>) => {
      const existingIndex = state.answers.findIndex(
        answer => answer.questionId === action.payload.questionId
      );
      
      if (existingIndex >= 0) {
        state.answers[existingIndex] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    
    // Remove answer
    removeAnswer: (state, action: PayloadAction<string>) => {
      state.answers = state.answers.filter(
        answer => answer.questionId !== action.payload
      );
    },
    
    // Clear all answers
    clearAnswers: (state) => {
      state.answers = [];
    },
    
    // Complete onboarding
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true;
    },
    
    // Reset onboarding
    resetOnboarding: (state) => {
      state.hasCompletedOnboarding = false;
      state.selectedCategory = null;
      state.currentStep = 0;
      state.totalSteps = 0;
      state.answers = [];
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle get onboarding questions
    builder
      .addMatcher(
        apiSlice.endpoints.getOnboardingQuestions.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getOnboardingQuestions.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.totalSteps = action.payload.length;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getOnboardingQuestions.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to load questions';
        }
      );

    // Handle submit onboarding answers
    builder
      .addMatcher(
        apiSlice.endpoints.submitOnboardingAnswers.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.submitOnboardingAnswers.matchFulfilled,
        (state) => {
          state.isLoading = false;
          state.hasCompletedOnboarding = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.submitOnboardingAnswers.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to submit answers';
        }
      );
  },
});

export const {
  setSelectedCategory,
  setCurrentStep,
  setTotalSteps,
  nextStep,
  previousStep,
  addAnswer,
  removeAnswer,
  clearAnswers,
  completeOnboarding,
  resetOnboarding,
  clearError,
} = onboardingSlice.actions;

export default onboardingSlice.reducer; 