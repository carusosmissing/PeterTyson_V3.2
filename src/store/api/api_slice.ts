import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with authentication headers
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.truexp.com',
  prepareHeaders: (headers, { getState }) => {
    // Get token from auth state
    const state = getState() as any;
    const token = state.auth?.token;
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Base query with re-authentication logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // Handle 401 unauthorized responses
  if (result.error && result.error.status === 401) {
    // Try to refresh token or logout user
    api.dispatch({ type: 'auth/logout' });
  }
  
  return result;
};

// Define the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Message',
    'Conversation',
    'Event',
    'Shrine',
    'Search',
    'OnboardingQuestion',
  ],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<
      { user: any; token: string; refreshToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    signUp: builder.mutation<
      { user: any; token: string; refreshToken: string },
      { email: string; password: string; username: string; displayName: string }
    >({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    resetPassword: builder.mutation<
      { success: boolean; message: string },
      { email: string }
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    // User endpoints
    getUserProfile: builder.query<any, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: ['User'],
    }),

    updateUserProfile: builder.mutation<
      any,
      { userId: string; data: Partial<any> }
    >({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Messaging endpoints
    getConversations: builder.query<any[], string>({
      query: (userId) => `/users/${userId}/conversations`,
      providesTags: ['Conversation'],
    }),

    getMessages: builder.query<any[], string>({
      query: (conversationId) => `/conversations/${conversationId}/messages`,
      providesTags: ['Message'],
    }),

    sendMessage: builder.mutation<
      any,
      { conversationId: string; content: string; messageType: string }
    >({
      query: ({ conversationId, ...data }) => ({
        url: `/conversations/${conversationId}/messages`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message', 'Conversation'],
    }),

    // Events endpoints
    getEvents: builder.query<any[], void>({
      query: () => '/events',
      providesTags: ['Event'],
    }),

    getEventDetails: builder.query<any, string>({
      query: (eventId) => `/events/${eventId}`,
      providesTags: ['Event'],
    }),

    // Shrine endpoints
    getShrineContent: builder.query<any[], string>({
      query: (userId) => `/users/${userId}/shrine`,
      providesTags: ['Shrine'],
    }),

    // Search endpoints
    search: builder.query<
      any[],
      { query: string; type?: string; filters?: any }
    >({
      query: ({ query, type, filters }) => ({
        url: '/search',
        params: { q: query, type, ...filters },
      }),
      providesTags: ['Search'],
    }),

    // Onboarding endpoints
    getOnboardingQuestions: builder.query<any[], string>({
      query: (category) => `/onboarding/questions?category=${category}`,
      providesTags: ['OnboardingQuestion'],
    }),

    submitOnboardingAnswers: builder.mutation<
      any,
      { userId: string; answers: any[] }
    >({
      query: ({ userId, answers }) => ({
        url: `/users/${userId}/onboarding`,
        method: 'POST',
        body: { answers },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  // Auth hooks
  useLoginMutation,
  useSignUpMutation,
  useResetPasswordMutation,
  
  // User hooks
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  
  // Messaging hooks
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  
  // Events hooks
  useGetEventsQuery,
  useGetEventDetailsQuery,
  
  // Shrine hooks
  useGetShrineContentQuery,
  
  // Search hooks
  useSearchQuery,
  
  // Onboarding hooks
  useGetOnboardingQuestionsQuery,
  useSubmitOnboardingAnswersMutation,
} = apiSlice; 