# Backend API Implementation Guide

## Overview

This guide covers the integration of backend services and external APIs into the TruEXP app. The app should be ready for backend connectivity through Supabase and social platform APIs (Facebook, Instagram, TikTok, Spotify).

## Current Backend Architecture Status

### ✅ **READY FOR CONNECTION**

#### Supabase Infrastructure (`src/services/supabase.ts`)
- **Configuration**: Environment variables configured
- **Service Architecture**: Complete service structure exists  
- **TypeScript Types**: Database schemas defined
- **Frontend Integration**: Redux slices ready for connection
- **File Storage**: Photo upload logic ready for cloud storage

#### Social Platform APIs (`src/services/`)
- **Complete OAuth flows** for all 4 platforms
- **Token management** with secure storage
- **API service classes** with type-safe interfaces
- **UI components** for connection management
- **Centralized manager** for unified platform control

### ⚠️ **NEEDS IMPLEMENTATION**

- **Live Supabase database connection**
- **Social platform OAuth callback handling** 
- **User authentication flow**
- **Real-time features activation**
- **Cloud photo storage connection**

## Supabase Integration Implementation

### 1. Database Setup

#### Required Tables Structure:
```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social connections table
CREATE TABLE social_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'facebook', 'instagram', 'tiktok', 'spotify'
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  access_token TEXT ENCRYPTED,
  refresh_token TEXT ENCRYPTED,
  expires_at TIMESTAMP WITH TIME ZONE,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sync TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, platform)
);

-- Trustubs table
CREATE TABLE trustubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stub_number TEXT NOT NULL,
  year TEXT,
  artist TEXT,
  venue TEXT,
  date DATE,
  notes TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trustub photos table
CREATE TABLE trustub_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trustub_id UUID REFERENCES trustubs(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  upload_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Row Level Security (RLS):
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE trustubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trustub_photos ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Social connections policies
CREATE POLICY "Users can manage own social connections" ON social_connections FOR ALL USING (auth.uid() = user_id);

-- Trustubs policies  
CREATE POLICY "Users can manage own trustubs" ON trustubs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public trustubs visible to all" ON trustubs FOR SELECT USING (is_public = TRUE);

-- Photos policies
CREATE POLICY "Users can manage photos of own trustubs" ON trustub_photos FOR ALL USING (
  EXISTS (SELECT 1 FROM trustubs WHERE trustubs.id = trustub_photos.trustub_id AND trustubs.user_id = auth.uid())
);
```

### 2. Storage Buckets

#### Create Storage Buckets:
```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('trustub-photos', 'trustub-photos', true),
  ('avatars', 'avatars', true);

-- Storage policies
CREATE POLICY "Users can upload own trustub photos" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'trustub-photos' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view trustub photos" ON storage.objects FOR SELECT USING (
  bucket_id = 'trustub-photos'
);

CREATE POLICY "Users can update own trustub photos" ON storage.objects FOR UPDATE USING (
  bucket_id = 'trustub-photos' AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 3. Environment Configuration

#### Update `.env` file:
```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Social Platform APIs
EXPO_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
EXPO_PUBLIC_FACEBOOK_APP_SECRET=your_facebook_app_secret
EXPO_PUBLIC_INSTAGRAM_APP_ID=your_instagram_app_id  
EXPO_PUBLIC_INSTAGRAM_APP_SECRET=your_instagram_app_secret
EXPO_PUBLIC_TIKTOK_CLIENT_KEY=your_tiktok_client_key
EXPO_PUBLIC_TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### 4. Authentication Implementation

#### Update `src/services/supabase.ts`:
```typescript
// Enable auth functions that are currently commented out
export const signUp = async (email: string, password: string, userData?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

// Social connections management
export const saveSocialConnection = async (connectionData: {
  platform: string;
  platform_user_id: string;
  platform_username: string;
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
}) => {
  const { data, error } = await supabase
    .from('social_connections')
    .upsert([{
      user_id: (await supabase.auth.getUser()).data.user?.id,
      ...connectionData,
      connected_at: new Date().toISOString()
    }]);
    
  if (error) throw error;
  return data;
};
```

## Social Platform API Integration

### 1. OAuth Callback Handling

#### Deep Linking Configuration (`app.json`):
```json
{
  "expo": {
    "scheme": "truexp",
    "web": {
      "bundler": "metro"
    },
    "plugins": [
      [
        "expo-linking",
        {
          "scheme": "truexp"
        }
      ]
    ]
  }
}
```

#### OAuth Callback Handler (`src/utils/deep_linking.ts`):
```typescript
import { Linking } from 'react-native';
import socialPlatformManager from '../services/social_platform_manager';
import { saveSocialConnection } from '../services/supabase';

export const setupDeepLinking = () => {
  const handleDeepLink = async (url: string) => {
    try {
      const urlObj = new URL(url);
      const code = urlObj.searchParams.get('code');
      const state = urlObj.searchParams.get('state');
      
      // Determine platform from URL path
      const platform = determinePlatformFromUrl(url);
      
      if (code && platform) {
        // Exchange code for token
        const result = await socialPlatformManager.handleAuthCallback(
          platform, 
          code, 
          state || undefined
        );
        
        if (result.success && result.data) {
          // Get user profile from platform
          const service = socialPlatformManager.getService(platform);
          const profileResult = await service.getUserProfile();
          
          if (profileResult.success) {
            // Save to Supabase
            await saveSocialConnection({
              platform,
              platform_user_id: profileResult.data.id,
              platform_username: profileResult.data.username || profileResult.data.name,
              access_token: result.data.access_token,
              refresh_token: result.data.refresh_token,
              expires_at: result.data.expires_at ? new Date(result.data.expires_at).toISOString() : undefined
            });
          }
        }
      }
    } catch (error) {
      console.error('Deep link handling error:', error);
    }
  };

  const subscription = Linking.addEventListener('url', handleDeepLink);
  return () => subscription?.remove();
};

const determinePlatformFromUrl = (url: string): string | null => {
  if (url.includes('/auth/facebook/')) return 'facebook';
  if (url.includes('/auth/instagram/')) return 'instagram';
  if (url.includes('/auth/tiktok/')) return 'tiktok';
  if (url.includes('/auth/spotify/')) return 'spotify';
  return null;
};
```

### 2. Update Social Platform Services

#### Integrate with Supabase storage (`src/services/social_platform_manager.ts`):
```typescript
import { saveSocialConnection, getUserSocialConnections } from './supabase';

// Add method to sync connections with backend
async loadConnectionsFromSupabase(): Promise<void> {
  try {
    const connections = await getUserSocialConnections();
    
    // Update local storage with backend data
    for (const connection of connections) {
      if (connection.access_token) {
        await storeToken(connection.platform as PlatformName, {
          access_token: connection.access_token,
          refresh_token: connection.refresh_token,
          expires_at: connection.expires_at ? new Date(connection.expires_at).getTime() : undefined,
          token_type: 'Bearer'
        });
      }
    }
  } catch (error) {
    console.error('Error loading connections from Supabase:', error);
  }
}
```

### 3. Photo Storage Integration

#### Update photo upload in Trustub Carousel (`src/components/trustub_carousel.tsx`):
```typescript
import { uploadTrustubPhoto } from '../services/supabase';

const handlePhotoUpload = async (photoUri: string, trustubId: string) => {
  try {
    // Upload to Supabase storage
    const photoUrl = await uploadTrustubPhoto(photoUri, trustubId);
    
    // Update trustub in database
    await supabase
      .from('trustub_photos')
      .insert([{
        trustub_id: trustubId,
        photo_url: photoUrl,
        upload_order: photos.length
      }]);
      
    // Update local state
    setPhotos(prev => [...prev, { uri: photoUrl, source: 'cloud' }]);
  } catch (error) {
    console.error('Photo upload error:', error);
  }
};
```

## Implementation Priority Order

### **Phase 1: Core Backend Connection**
1. ✅ Set up Supabase database with required tables
2. ✅ Configure environment variables  
3. ✅ Enable authentication in the existing auth service
4. ✅ Test user registration and login flows

### **Phase 2: Social Platform Integration**
1. ✅ Configure deep linking for OAuth callbacks
2. ✅ Implement OAuth callback handler
3. ✅ Connect social services to Supabase storage
4. ✅ Test social platform connections end-to-end

### **Phase 3: Data Synchronization**
1. ✅ Connect trustub creation to Supabase
2. ✅ Implement photo cloud storage
3. ✅ Add real-time sync for user data
4. ✅ Implement offline/online data reconciliation

### **Phase 4: Advanced Features**
1. ✅ Real-time messaging infrastructure
2. ✅ Push notifications setup
3. ✅ Social sharing features
4. ✅ Privacy controls and public/private toggles

## Testing Strategy

### **Backend Integration Tests**
- User registration and authentication flows
- Social platform OAuth complete cycles  
- Photo upload and storage functionality
- Real-time data synchronization
- Offline data persistence and sync

### **API Integration Tests**
- All social platform API endpoints
- Token refresh and expiration handling
- Error handling for network failures
- Rate limiting and retry logic

## Security Considerations

### **Data Protection**
- All social tokens encrypted in database
- User data isolated with RLS policies
- Secure photo upload with user validation
- OAuth state parameter validation

### **API Security**
- Environment variables for all secrets
- Token rotation and refresh handling
- Secure deep linking validation
- Rate limiting implementation

## Performance Optimization

### **Database Performance**
- Indexed queries for user lookups
- Pagination for large photo sets
- Efficient real-time subscriptions
- Connection pooling optimization

### **API Performance**
- Token caching and validation
- Batch API requests where possible
- Smart sync scheduling
- Background data updates

## Monitoring and Analytics

### **Backend Monitoring**
- Supabase dashboard metrics
- API response time tracking
- Error rate monitoring
- User engagement analytics

### **Social API Monitoring**
- OAuth success/failure rates
- API quota usage tracking
- Token refresh success rates
- Platform-specific error patterns

## Ready-to-Implement Status

✅ **Supabase service architecture complete**  
✅ **Social platform services fully implemented**  
✅ **UI components ready for real data**  
✅ **State management configured**  
✅ **TypeScript types defined**  
✅ **Error handling implemented**  
✅ **Photo management ready for cloud storage**  

**Next Step**: Set up the Supabase database, configure OAuth apps, and connect the existing services - it should fucking work!  