# Redux Toolkit Setup Documentation

## Overview

This document outlines the Redux Toolkit implementation for the TruEXP app, including state management patterns, RTK Query setup, and integration with the existing navigation structure.

## Architecture

### Store Structure

```
src/store/
├── store.ts              # Main store configuration
├── types.ts              # Shared TypeScript types
├── hooks.ts              # Typed Redux hooks
├── index.ts              # Public exports
├── api/
│   └── api_slice.ts      # RTK Query API slice
└── slices/
    ├── auth_slice.ts     # Authentication state
    ├── user_slice.ts     # User profile and preferences
    ├── onboarding_slice.ts # Onboarding progress
    ├── app_slice.ts      # Global app state
    ├── messaging_slice.ts # Chat and messaging
    ├── events_slice.ts   # Events and gallery
    ├── shrine_slice.ts   # Shrine content
    └── search_slice.ts   # Search functionality
```

## State Management Patterns

### Feature-Based Slices
Each major app feature has its own slice with:
- **State**: Feature-specific data and UI state
- **Reducers**: Synchronous state updates
- **Extra Reducers**: Integration with RTK Query
- **Actions**: Exported action creators

### RTK Query Integration
- Centralized API management
- Automatic caching and invalidation
- Loading and error state management
- TypeScript integration

## Usage Examples

### Authentication
```typescript
import { useLoginMutation, useAppSelector } from '../store';

const LoginScreen = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  
  const handleLogin = async (credentials) => {
    await login(credentials).unwrap();
  };
};
```

### State Updates
```typescript
import { useAppDispatch } from '../store';
import { setSelectedCategory, nextStep } from '../store';

const dispatch = useAppDispatch();
dispatch(setSelectedCategory('music'));
dispatch(nextStep());
```

## Integration Points

### Navigation
- Root navigator uses Redux state for auth flow
- Onboarding state determines navigation path
- Modal states managed through Redux

### API Calls
- All API calls go through RTK Query
- Automatic state updates on success/failure
- Centralized error handling

## Best Practices Implemented

1. **Type Safety**: Full TypeScript integration
2. **State Normalization**: Flat state structure
3. **Error Handling**: Per-feature error states
4. **Loading States**: Granular loading management
5. **Cache Management**: Tag-based invalidation

This setup provides a scalable foundation for the TruEXP app's state management needs.

## State Slices

### 1. Auth Slice (`auth_slice.ts`)
Manages user authentication and session state.

**State:**
- `user`: Current user object
- `token`: JWT access token
- `refreshToken`: Refresh token for token renewal
- `isAuthenticated`: Boolean authentication status
- `isLoading`: Loading state for auth operations
- `error`: Authentication error messages

**Actions:**
- `logout()`: Clear user session
- `clearError()`: Clear authentication errors
- `setLoading(boolean)`: Set loading state
- `restoreSession(sessionData)`: Restore session from storage

**Integration with RTK Query:**
- Automatically handles login/signup/resetPassword API responses
- Updates state based on API call success/failure

### 2. User Slice (`user_slice.ts`)
Manages user profile data and preferences.

**State:**
- `profile`: User profile information
- `preferences`: User preferences (category, notifications, theme)
- `isLoading`: Loading state
- `error`: Error messages

**Actions:**
- `updatePreferences(preferences)`: Update user preferences
- `setCategory('music' | 'sports')`: Set user category preference
- `toggleNotifications()`: Toggle notification preferences
- `setTheme('light' | 'dark')`: Set app theme
- `clearUserData()`: Clear all user data

### 3. Onboarding Slice (`onboarding_slice.ts`)
Manages onboarding flow and progress.

**State:**
- `hasCompletedOnboarding`: Completion status
- `selectedCategory`: Music or sports selection
- `currentStep`: Current onboarding step
- `totalSteps`: Total number of steps
- `answers`: Array of question answers
- `isLoading`: Loading state
- `error`: Error messages

**Actions:**
- `setSelectedCategory('music' | 'sports')`: Set category choice
- `nextStep()` / `previousStep()`: Navigate steps
- `addAnswer(answer)`: Add/update question answer
- `completeOnboarding()`: Mark onboarding as complete
- `resetOnboarding()`: Reset onboarding state

### 4. App Slice (`app_slice.ts`)
Manages global app state and UI state.

**State:**
- `isInitialized`: App initialization status
- `isOnline`: Network connectivity status
- `notifications`: In-app notifications array
- `modals`: Modal open/close states
- `loading`: Global loading states

**Actions:**
- `setInitialized(boolean)`: Set app initialization
- `setOnlineStatus(boolean)`: Update connectivity status
- `addNotification(notification)`: Add new notification
- `markNotificationAsRead(id)`: Mark notification as read
- `openProfileModal()` / `closeProfileModal()`: Modal management
- `setGlobalLoading(boolean)`: Set global loading state

### 5. Messaging Slice (`messaging_slice.ts`)
Manages chat conversations and messages.

**State:**
- `conversations`: Array of conversation objects
- `currentConversation`: Currently active conversation
- `messages`: Messages organized by conversation ID
- `unreadCount`: Total unread message count
- `typing`: Typing indicators by conversation
- `isLoading`: Loading state
- `error`: Error messages

**Actions:**
- `setCurrentConversation(conversation)`: Set active conversation
- `addMessage(conversationId, message)`: Add new message
- `markConversationAsRead(conversationId)`: Mark as read
- `setTyping(conversationId, userIds)`: Set typing indicators
- `deleteConversation(conversationId)`: Delete conversation

### 6. Events Slice (`events_slice.ts`)
Manages event data and gallery.

**State:**
- `events`: Array of event objects
- `featuredEvents`: Featured events array
- `currentEvent`: Currently selected event
- `filters`: Event filtering options
- `isLoading`: Loading state
- `error`: Error messages

**Actions:**
- `setCurrentEvent(event)`: Set selected event
- `clearError()`: Clear error state

### 7. Shrine Slice (`shrine_slice.ts`)
Manages shrine content and interactions.

**State:**
- `content`: Shrine content array
- `userShrines`: User's shrine content
- `currentShrine`: Currently selected shrine
- `interactions`: Like/share/comment data
- `isLoading`: Loading state
- `error`: Error messages

**Actions:**
- `setCurrentShrine(shrine)`: Set selected shrine
- `clearError()`: Clear error state

### 8. Search Slice (`search_slice.ts`)
Manages search functionality and results.

**State:**
- `query`: Current search query
- `results`: Search results by type (users, events, content)
- `filters`: Search filtering options
- `history`: Search history array
- `isLoading`: Loading state
- `error`: Error messages

**Actions:**
- `setQuery(query)`: Set search query
- `addToHistory(query)`: Add to search history
- `clearHistory()`: Clear search history
- `clearError()`: Clear error state

## RTK Query API Slice

### Base Configuration
- **Base URL**: Configurable via environment variable
- **Authentication**: Automatic JWT token injection
- **Re-authentication**: Automatic logout on 401 responses
- **Caching**: Automatic caching with tag-based invalidation

### Endpoints

#### Authentication
- `login(credentials)`: User login
- `signUp(userData)`: User registration
- `resetPassword(email)`: Password reset

#### User Management
- `getUserProfile(userId)`: Get user profile
- `updateUserProfile(userId, data)`: Update profile

#### Messaging
- `getConversations(userId)`: Get user conversations
- `getMessages(conversationId)`: Get conversation messages
- `sendMessage(conversationId, content, type)`: Send message

#### Events
- `getEvents()`: Get all events
- `getEventDetails(eventId)`: Get event details

#### Shrine
- `getShrineContent(userId)`: Get shrine content

#### Search
- `search(query, type, filters)`: Search functionality

#### Onboarding
- `getOnboardingQuestions(category)`: Get questions
- `submitOnboardingAnswers(userId, answers)`: Submit answers

### Cache Tags
- `User`: User-related data
- `Message`: Message data
- `Conversation`: Conversation data
- `Event`: Event data
- `Shrine`: Shrine content
- `Search`: Search results
- `OnboardingQuestion`: Onboarding questions

## Typed Hooks

### Basic Hooks
```typescript
import { useAppDispatch, useAppSelector } from '../store';

// Usage
const dispatch = useAppDispatch();
const authState = useAppSelector(state => state.auth);
```

### Convenience Selectors
```typescript
import { useAuth, useUser, useIsAuthenticated } from '../store/hooks';

// Usage
const { user, isLoading } = useAuth();
const isAuthenticated = useIsAuthenticated();
```

## Integration with Navigation

The root navigator now uses Redux state to determine navigation flow:

```typescript
// src/navigation/root_navigator.tsx
const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
const hasCompletedOnboarding = useAppSelector(state => state.onboarding.hasCompletedOnboarding);
```

## Best Practices

### 1. State Normalization
- Keep state flat and normalized
- Use IDs to reference related data
- Avoid deeply nested objects

### 2. Error Handling
- Each slice has its own error state
- Clear errors when starting new operations
- Provide user-friendly error messages

### 3. Loading States
- Granular loading states per feature
- Global loading for app-wide operations
- Optimistic updates where appropriate

### 4. Cache Management
- Use RTK Query tags for cache invalidation
- Implement proper cache timing
- Handle offline scenarios

### 5. Type Safety
- Use TypeScript throughout
- Define proper interfaces for all data
- Use typed hooks for Redux

## Environment Setup

### Required Environment Variables
```env
EXPO_PUBLIC_API_URL=https://api.truexp.com
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing Considerations

### Unit Testing
- Test reducers with different actions
- Test selectors with mock state
- Test API endpoints with mock responses

### Integration Testing
- Test component integration with Redux
- Test navigation flow with state changes
- Test error handling scenarios

## Performance Considerations

### Optimization Strategies
- Use `createSelector` for expensive computations
- Implement proper memoization
- Use RTK Query's built-in caching
- Avoid unnecessary re-renders with proper selectors

### Memory Management
- Clean up subscriptions
- Clear unused cache data
- Implement proper logout cleanup

## Future Enhancements

### Planned Features
- Real-time updates with WebSocket integration
- Offline support with Redux Persist
- Advanced caching strategies
- Performance monitoring
- Analytics integration

### Supabase Integration
- Replace mock API with Supabase endpoints
- Implement real-time subscriptions
- Add proper authentication flow
- Set up database relationships

This Redux setup provides a solid foundation for the TruEXP app with proper state management, type safety, and scalable architecture patterns. 