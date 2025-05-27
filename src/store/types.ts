// Shared types for Redux store to avoid circular imports

export interface AuthState {
  user: any | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserState {
  profile: any | null;
  preferences: {
    category: 'music' | 'sports' | null;
    notifications: boolean;
    theme: 'light' | 'dark';
  };
  isLoading: boolean;
  error: string | null;
}

export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  selectedCategory: 'music' | 'sports' | 'both' | null;
  currentStep: number;
  totalSteps: number;
  answers: Array<{
    questionId: string;
    selectedOptions: string[];
  }>;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  isInitialized: boolean;
  isOnline: boolean;
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
  modals: {
    isProfileModalOpen: boolean;
    isSettingsModalOpen: boolean;
    isEventModalOpen: boolean;
  };
  loading: {
    global: boolean;
    auth: boolean;
    data: boolean;
  };
}

export interface MessagingState {
  conversations: any[];
  currentConversation: any | null;
  messages: { [conversationId: string]: any[] };
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  typing: { [conversationId: string]: string[] };
}

export interface EventsState {
  events: any[];
  featuredEvents: any[];
  currentEvent: any | null;
  filters: {
    category: string | null;
    location: string | null;
    dateRange: { start: string | null; end: string | null };
  };
  isLoading: boolean;
  error: string | null;
}

export interface ShrineState {
  content: any[];
  userShrines: any[];
  currentShrine: any | null;
  interactions: {
    likes: number;
    shares: number;
    comments: any[];
  };
  isLoading: boolean;
  error: string | null;
}

export interface SearchState {
  query: string;
  results: {
    users: any[];
    events: any[];
    content: any[];
  };
  filters: {
    type: 'all' | 'users' | 'events' | 'content';
    category: string | null;
  };
  history: string[];
  isLoading: boolean;
  error: string | null;
} 