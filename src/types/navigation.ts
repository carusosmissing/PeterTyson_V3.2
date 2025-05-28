import type { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack Types
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignupOptions: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Terms: undefined;
};

// Onboarding Stack Types
export type OnboardingStackParamList = {
  MusicOrSports: undefined;
  MusicGigCount: undefined;
  MusicFanFuel: undefined;
  MusicVibe: undefined;
  SportsGameCount: undefined;
  SportsBig3: undefined;
  SportsFanFuel: undefined;
  WelcomeClaimScreen: undefined;
  ClaimReveal: undefined;
};

// Main Tab Types
export type MainTabParamList = {
  Home: undefined;
  ThePit: undefined;
  TheShrine: undefined;
  Search: undefined;
  Messaging: NavigatorScreenParams<MessagingStackParamList>;
};

// Messaging Stack Types
export type MessagingStackParamList = {
  Inbox: undefined;
  DirectMessage: {
    userId: string;
    userName: string;
  };
  Chat: {
    chatId: string;
    chatName: string;
  };
  DMEmily: undefined;
  DMJiara: undefined;
  DMLila: undefined;
};

// Events Stack Types
export type EventsStackParamList = {
  EventGallery: undefined;
  EventDetails: {
    eventId: string;
  };
};

// Shrine Stack Types
export type ShrineStackParamList = {
  ShrineView1: undefined;
  ShrineView2: undefined;
};

// Root Stack Types
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Events: NavigatorScreenParams<EventsStackParamList>;
  Shrine: NavigatorScreenParams<ShrineStackParamList>;
};

// Navigation prop types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 