import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api_slice';
import type { MessagingState } from '../types';

const initialState: MessagingState = {
  conversations: [],
  currentConversation: null,
  messages: {},
  unreadCount: 0,
  isLoading: false,
  error: null,
  typing: {},
};

const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    // Set current conversation
    setCurrentConversation: (state, action: PayloadAction<any | null>) => {
      state.currentConversation = action.payload;
    },
    
    // Add message to conversation
    addMessage: (state, action: PayloadAction<{
      conversationId: string;
      message: any;
    }>) => {
      const { conversationId, message } = action.payload;
      
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      
      state.messages[conversationId].push(message);
      
      // Update conversation last message
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.lastMessage = message;
        conversation.updatedAt = message.timestamp;
      }
    },
    
    // Mark conversation as read
    markConversationAsRead: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      
      if (conversation && conversation.unreadCount > 0) {
        state.unreadCount -= conversation.unreadCount;
        conversation.unreadCount = 0;
      }
      
      // Mark messages as read
      if (state.messages[conversationId]) {
        state.messages[conversationId].forEach(message => {
          if (!message.isRead) {
            message.isRead = true;
          }
        });
      }
    },
    
    // Update unread count
    updateUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    
    // Set typing status
    setTyping: (state, action: PayloadAction<{
      conversationId: string;
      userIds: string[];
    }>) => {
      const { conversationId, userIds } = action.payload;
      state.typing[conversationId] = userIds;
    },
    
    // Clear typing status
    clearTyping: (state, action: PayloadAction<string>) => {
      delete state.typing[action.payload];
    },
    
    // Delete conversation
    deleteConversation: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      
      state.conversations = state.conversations.filter(c => c.id !== conversationId);
      delete state.messages[conversationId];
      delete state.typing[conversationId];
      
      if (state.currentConversation?.id === conversationId) {
        state.currentConversation = null;
      }
    },
    
    // Clear all messages
    clearAllMessages: (state) => {
      state.conversations = [];
      state.currentConversation = null;
      state.messages = {};
      state.unreadCount = 0;
      state.typing = {};
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle get conversations
    builder
      .addMatcher(
        apiSlice.endpoints.getConversations.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getConversations.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.conversations = action.payload;
          
          // Calculate total unread count
          state.unreadCount = action.payload.reduce(
            (total: number, conv: any) => total + (conv.unreadCount || 0),
            0
          );
          
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getConversations.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to load conversations';
        }
      );

    // Handle get messages
    builder
      .addMatcher(
        apiSlice.endpoints.getMessages.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getMessages.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          
          // Extract conversation ID from the request
          const conversationId = action.meta.arg.originalArgs;
          state.messages[conversationId] = action.payload;
          
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.getMessages.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to load messages';
        }
      );

    // Handle send message
    builder
      .addMatcher(
        apiSlice.endpoints.sendMessage.matchPending,
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.sendMessage.matchFulfilled,
        (state, action) => {
          // Message will be added via real-time updates or refetch
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.sendMessage.matchRejected,
        (state, action) => {
          state.error = action.error.message || 'Failed to send message';
        }
      );
  },
});

export const {
  setCurrentConversation,
  addMessage,
  markConversationAsRead,
  updateUnreadCount,
  setTyping,
  clearTyping,
  deleteConversation,
  clearAllMessages,
  clearError,
} = messagingSlice.actions;

export default messagingSlice.reducer; 