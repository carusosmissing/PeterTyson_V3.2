// TruEXP Supabase Client Configuration
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client with AsyncStorage for persistence
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string;
          bio?: string;
          category: 'music' | 'sports';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string;
          bio?: string;
          category: 'music' | 'sports';
        };
        Update: {
          username?: string;
          display_name?: string;
          avatar_url?: string;
          bio?: string;
          category?: 'music' | 'sports';
        };
      };
      conversations: {
        Row: {
          id: string;
          name?: string;
          is_group: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name?: string;
          is_group?: boolean;
        };
        Update: {
          name?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          message_type: 'text' | 'image' | 'file';
          created_at: string;
        };
        Insert: {
          conversation_id: string;
          sender_id: string;
          content: string;
          message_type?: 'text' | 'image' | 'file';
        };
        Update: {
          content?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description?: string;
          image_url?: string;
          date: string;
          location?: string;
          category: 'music' | 'sports';
          created_at: string;
        };
        Insert: {
          title: string;
          description?: string;
          image_url?: string;
          date: string;
          location?: string;
          category: 'music' | 'sports';
        };
        Update: {
          title?: string;
          description?: string;
          image_url?: string;
          date?: string;
          location?: string;
        };
      };
    };
  };
}

// Authentication service
export class AuthService {
  // Sign up with email and password
  static async signUp(email: string, password: string, userData: {
    username: string;
    displayName: string;
    category: 'music' | 'sports';
  }) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: userData.username,
            display_name: userData.displayName,
            category: userData.category,
          },
        },
      });

      if (error) throw error;

      // Create profile record
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          username: userData.username,
          display_name: userData.displayName,
          category: userData.category,
        });
      }

      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Reset password
  static async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Get current session
  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }
}

// Profile service
export class ProfileService {
  // Get user profile
  static async getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(userId: string, updates: Database['public']['Tables']['profiles']['Update']) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Upload avatar image
  static async uploadAvatar(userId: string, imageUri: string) {
    try {
      const fileExt = imageUri.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Convert image to blob for upload
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      await this.updateProfile(userId, { avatar_url: publicUrl });

      return publicUrl;
    } catch (error) {
      console.error('Upload avatar error:', error);
      throw error;
    }
  }
}

// Messaging service
export class MessagingService {
  // Get conversations for user
  static async getConversations(userId: string) {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages (
            id,
            content,
            created_at,
            sender_id,
            profiles (display_name, avatar_url)
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get conversations error:', error);
      throw error;
    }
  }

  // Get messages for conversation
  static async getMessages(conversationId: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles (display_name, avatar_url)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get messages error:', error);
      throw error;
    }
  }

  // Send message
  static async sendMessage(conversationId: string, senderId: string, content: string, messageType: 'text' | 'image' | 'file' = 'text') {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: senderId,
          content,
          message_type: messageType,
        })
        .select()
        .single();

      if (error) throw error;

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      return data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }

  // Subscribe to real-time messages
  static subscribeToMessages(conversationId: string, callback: (message: any) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        callback
      )
      .subscribe();
  }

  // Unsubscribe from real-time messages
  static unsubscribeFromMessages(subscription: any) {
    supabase.removeChannel(subscription);
  }
}

// Events service
export class EventsService {
  // Get all events
  static async getEvents(category?: 'music' | 'sports') {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get events error:', error);
      throw error;
    }
  }

  // Get event by ID
  static async getEvent(eventId: string) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get event error:', error);
      throw error;
    }
  }
}

// File upload service
export class FileService {
  // Upload image to storage
  static async uploadImage(bucket: string, filePath: string, imageUri: string) {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, blob);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Upload image error:', error);
      throw error;
    }
  }

  // Delete file from storage
  static async deleteFile(bucket: string, filePath: string) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) throw error;
    } catch (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  }
}

// Export services
export const SupabaseServices = {
  Auth: AuthService,
  Profile: ProfileService,
  Messaging: MessagingService,
  Events: EventsService,
  File: FileService,
}; 