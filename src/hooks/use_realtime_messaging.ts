// TruEXP Real-time Messaging Hook
import { useEffect, useRef, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  addMessage, 
  setTyping, 
  clearTyping 
} from '../store/slices/messaging_slice';
import { SupabaseServices, supabase } from '../services/supabase';

export interface UseRealtimeMessagingOptions {
  conversationId?: string;
  userId?: string;
  onMessageReceived?: (message: any) => void;
  onTypingUpdate?: (users: string[]) => void;
  onConnectionChange?: (connected: boolean) => void;
}

export const useRealtimeMessaging = (options: UseRealtimeMessagingOptions = {}) => {
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector(state => state.messaging);
  const { user } = useAppSelector(state => state.auth);
  
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionRef = useRef<any>(null);
  const typingTimeoutRef = useRef<{ [userId: string]: NodeJS.Timeout }>({});
  
  const {
    conversationId = currentConversation?.id,
    userId = user?.id,
    onMessageReceived,
    onTypingUpdate,
    onConnectionChange,
  } = options;

  // Subscribe to messages for a specific conversation
  const subscribeToConversation = useCallback((convId: string) => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
    }

    subscriptionRef.current = supabase
      .channel(`conversation:${convId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${convId}`,
        },
        (payload) => {
          const newMessage = payload.new;
          
          // Don't add our own messages (they're already optimistically added)
          if (newMessage.sender_id !== userId) {
            dispatch(addMessage({
              conversationId: convId,
              message: newMessage
            }));
            onMessageReceived?.(newMessage);
          }
        }
      )
      .subscribe((status) => {
        const connected = status === 'SUBSCRIBED';
        setIsConnected(connected);
        onConnectionChange?.(connected);
        
        if (connected) {
          console.log('Connected to conversation:', convId);
        } else {
          console.log('Disconnected from conversation:', convId);
        }
      });

    return subscriptionRef.current;
  }, [dispatch, userId, onMessageReceived, onConnectionChange]);

  // Send typing indicator
  const sendTypingIndicator = useCallback(async (convId: string, isTyping: boolean) => {
    if (!userId || !subscriptionRef.current) return;

    try {
      if (isTyping) {
        dispatch(setTyping({
          conversationId: convId,
          userIds: [userId]
        }));
      } else {
        dispatch(clearTyping(convId));
      }
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }
  }, [userId, dispatch]);

  // Handle typing with auto-stop
  const handleTyping = useCallback((convId: string) => {
    if (!userId) return;

    // Clear existing timeout
    if (typingTimeoutRef.current[userId]) {
      clearTimeout(typingTimeoutRef.current[userId]);
    }

    // Send typing indicator
    sendTypingIndicator(convId, true);

    // Auto-stop typing after 3 seconds
    typingTimeoutRef.current[userId] = setTimeout(() => {
      sendTypingIndicator(convId, false);
      delete typingTimeoutRef.current[userId];
    }, 3000);
  }, [userId, sendTypingIndicator]);

  // Stop typing
  const stopTyping = useCallback((convId: string) => {
    if (!userId) return;

    if (typingTimeoutRef.current[userId]) {
      clearTimeout(typingTimeoutRef.current[userId]);
      delete typingTimeoutRef.current[userId];
    }

    sendTypingIndicator(convId, false);
  }, [userId, sendTypingIndicator]);

  // Send message with optimistic updates
  const sendMessage = useCallback(async (
    convId: string, 
    content: string, 
    messageType: 'text' | 'image' | 'file' = 'text'
  ) => {
    if (!userId) return null;

    try {
      // Create optimistic message
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        conversationId: convId,
        senderId: userId,
        content,
        messageType,
        timestamp: new Date().toISOString(),
        status: 'sending' as const,
      };

      // Add optimistic message to store
      dispatch(addMessage({
        conversationId: convId,
        message: optimisticMessage
      }));

      // Send to Supabase
      const sentMessage = await SupabaseServices.Messaging.sendMessage(
        convId,
        userId,
        content,
        messageType
      );

      // Update with real message ID
      if (sentMessage) {
        dispatch(addMessage({
          conversationId: convId,
          message: { ...sentMessage, status: 'sent' }
        }));
      }

      return sentMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  }, [userId, dispatch]);

  // Upload and send image
  const sendImage = useCallback(async (convId: string, imageUri: string) => {
    if (!userId) return null;

    try {
      // Upload image to Supabase storage
      const fileName = `message-${Date.now()}.jpg`;
      const filePath = `messages/${convId}/${fileName}`;
      
      const imageUrl = await SupabaseServices.File.uploadImage(
        'messages',
        filePath,
        imageUri
      );

      // Send message with image URL
      return await sendMessage(convId, imageUrl, 'image');
    } catch (error) {
      console.error('Error sending image:', error);
      return null;
    }
  }, [sendMessage, userId]);

  // Subscribe to conversation when conversationId changes
  useEffect(() => {
    if (conversationId) {
      const subscription = subscribeToConversation(conversationId);
      
      return () => {
        if (subscription) {
          supabase.removeChannel(subscription);
        }
      };
    }
  }, [conversationId, subscribeToConversation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all typing timeouts
      Object.values(typingTimeoutRef.current).forEach(timeout => {
        clearTimeout(timeout);
      });
      
      // Unsubscribe from channels
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, []);

  return {
    // State
    isConnected,
    
    // Actions
    sendMessage,
    sendImage,
    handleTyping,
    stopTyping,
    subscribeToConversation,
    
    // Utils
    isTyping: (convId: string) => {
      return userId ? typingTimeoutRef.current[userId] !== undefined : false;
    },
  };
};

// Hook for managing multiple conversation subscriptions
export const useRealtimeConversations = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const subscriptionsRef = useRef<{ [convId: string]: any }>({});

  const subscribeToAllConversations = useCallback(async () => {
    if (!user?.id) return;

    try {
      // Get user's conversations
      const conversations = await SupabaseServices.Messaging.getConversations(user.id);
      
      // Subscribe to each conversation
      conversations.forEach(conversation => {
        if (!subscriptionsRef.current[conversation.id]) {
          const subscription = supabase
            .channel(`conversation:${conversation.id}`)
            .on(
              'postgres_changes',
              {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversation.id}`,
              },
              (payload) => {
                const newMessage = payload.new;
                if (newMessage.sender_id !== user.id) {
                  dispatch(addMessage({
                    conversationId: conversation.id,
                    message: newMessage
                  }));
                }
              }
            )
            .subscribe();

          subscriptionsRef.current[conversation.id] = subscription;
        }
      });
    } catch (error) {
      console.error('Error subscribing to conversations:', error);
    }
  }, [user?.id, dispatch]);

  const unsubscribeFromAllConversations = useCallback(() => {
    Object.values(subscriptionsRef.current).forEach(subscription => {
      supabase.removeChannel(subscription);
    });
    subscriptionsRef.current = {};
  }, []);

  useEffect(() => {
    if (user?.id) {
      subscribeToAllConversations();
    }

    return () => {
      unsubscribeFromAllConversations();
    };
  }, [user?.id, subscribeToAllConversations, unsubscribeFromAllConversations]);

  return {
    subscribeToAllConversations,
    unsubscribeFromAllConversations,
  };
}; 