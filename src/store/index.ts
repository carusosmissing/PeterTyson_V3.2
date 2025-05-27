// Redux store exports
export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';

// Export all slice actions
export { logout, clearError as clearAuthError, setLoading, restoreSession } from './slices/auth_slice';
export { 
  updatePreferences, 
  setCategory, 
  toggleNotifications, 
  setTheme, 
  clearUserData,
  clearError as clearUserError 
} from './slices/user_slice';
export {
  setSelectedCategory,
  setCurrentStep,
  nextStep,
  previousStep,
  addAnswer,
  completeOnboarding,
  resetOnboarding,
  clearError as clearOnboardingError
} from './slices/onboarding_slice';
export {
  setInitialized,
  setOnlineStatus,
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearNotifications,
  openProfileModal,
  closeProfileModal,
  setGlobalLoading
} from './slices/app_slice';
export {
  setCurrentConversation,
  addMessage,
  markConversationAsRead,
  setTyping,
  clearTyping,
  clearError as clearMessagingError
} from './slices/messaging_slice';
export {
  setCurrentEvent,
  clearError as clearEventsError
} from './slices/events_slice';
export {
  setCurrentShrine,
  clearError as clearShrineError
} from './slices/shrine_slice';
export {
  setQuery,
  addToHistory,
  clearHistory,
  clearError as clearSearchError
} from './slices/search_slice';

// Export API hooks
export {
  useLoginMutation,
  useSignUpMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useGetShrineContentQuery,
  useSearchQuery,
  useGetOnboardingQuestionsQuery,
  useSubmitOnboardingAnswersMutation,
} from './api/api_slice'; 