// User types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  messageType: 'text' | 'image' | 'video' | 'audio';
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
  artistId: string;
  artistName: string;
  ticketUrl?: string;
}

// Onboarding types
export interface OnboardingQuestion {
  id: string;
  question: string;
  options: string[];
  type: 'single' | 'multiple';
  category: 'music' | 'sports';
}

export interface OnboardingAnswer {
  questionId: string;
  selectedOptions: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  displayName: string;
}

export interface ForgotPasswordForm {
  email: string;
} 