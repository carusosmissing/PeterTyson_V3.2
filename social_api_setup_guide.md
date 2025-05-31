# Social Platform API Setup Guide

This guide explains how to set up and integrate Facebook, Instagram, TikTok, and Spotify APIs with your React Native app.

## Overview

The social platform integration provides:
- ✅ OAuth authentication flows for all platforms
- ✅ Type-safe API interfaces 
- ✅ Centralized token management
- ✅ Ready-to-use UI components
- ✅ Error handling and status tracking

## Quick Start

### 1. Environment Setup

Create a `.env` file in your project root with your API credentials:

```env
# Facebook/Instagram (Meta)
EXPO_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
EXPO_PUBLIC_FACEBOOK_APP_SECRET=your_facebook_app_secret
EXPO_PUBLIC_INSTAGRAM_APP_ID=your_instagram_app_id  
EXPO_PUBLIC_INSTAGRAM_APP_SECRET=your_instagram_app_secret

# TikTok
EXPO_PUBLIC_TIKTOK_CLIENT_KEY=your_tiktok_client_key
EXPO_PUBLIC_TIKTOK_CLIENT_SECRET=your_tiktok_client_secret

# Spotify
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### 2. Install Required Dependencies

```bash
npm install @react-native-async-storage/async-storage
# or
yarn add @react-native-async-storage/async-storage
```

### 3. Update Redirect URIs

In `src/constants/social_platforms.ts`, update the `REDIRECT_URI` fields to match your app's deep linking scheme:

```typescript
REDIRECT_URI: 'yourapp://auth/facebook/callback',
```

### 4. Add the Social Connections Screen

Add the social connections screen to your navigation:

```typescript
import SocialConnectionsScreen from '../screens/social_connections_screen';

// In your navigator
<Stack.Screen 
  name="SocialConnections" 
  component={SocialConnectionsScreen}
  options={{ title: 'Social Media' }}
/>
```

## Platform Setup Guides

### Facebook & Instagram (Meta)

1. **Create Meta App**: Go to [Meta for Developers](https://developers.facebook.com/)
2. **Add Facebook Login**: Enable Facebook Login product
3. **Add Instagram Basic Display**: Enable Instagram Basic Display product
4. **Configure OAuth Redirect URIs**: Add your app's redirect URIs
5. **Get App ID and Secret**: Copy from app dashboard

**Required Permissions:**
- Facebook: `email`, `public_profile`, `user_posts`, `pages_read_engagement`
- Instagram: `user_profile`, `user_media`

### TikTok

1. **Create TikTok App**: Go to [TikTok for Developers](https://developers.tiktok.com/)
2. **Enable Login Kit**: Add Login Kit to your app
3. **Configure Redirect URIs**: Add your app's callback URLs
4. **Get Client Key and Secret**: Copy from app settings

**Required Scopes:**
- `user.info.basic`, `video.list`, `video.upload`

### Spotify

1. **Create Spotify App**: Go to [Spotify for Developers](https://developer.spotify.com/)
2. **Configure App Settings**: Add redirect URIs
3. **Get Client ID and Secret**: Copy from app dashboard

**Required Scopes:**
- `user-read-private`, `user-read-email`, `user-top-read`, `user-read-recently-played`

## Implementation Tasks for Developers

### Critical: OAuth Callback Handling

The current implementation opens OAuth URLs in the browser but **you need to implement deep linking to handle the callback**:

```typescript
// Example callback handler
import { Linking } from 'react-native';
import socialPlatformManager from '../services/social_platform_manager';

const handleDeepLink = async (url: string) => {
  // Parse the callback URL
  const urlObj = new URL(url);
  const code = urlObj.searchParams.get('code');
  const state = urlObj.searchParams.get('state');
  
  // Determine platform from URL path
  const platform = determinePlatformFromUrl(url);
  
  if (code && platform) {
    const result = await socialPlatformManager.handleAuthCallback(
      platform, 
      code, 
      state || undefined
    );
    
    if (result.success) {
      // Handle successful authentication
      navigation.navigate('SocialConnections');
    }
  }
};

// Set up deep linking
useEffect(() => {
  const subscription = Linking.addEventListener('url', handleDeepLink);
  return () => subscription?.remove();
}, []);
```

### Additional Tasks

1. **Deep Linking Configuration**
   - Configure URL schemes in `app.json`
   - Set up universal links for production

2. **Token Refresh Logic**
   - Implement automatic token refresh
   - Handle refresh token rotation

3. **Error Handling**
   - Add user-friendly error messages
   - Implement retry logic for failed requests

4. **Data Persistence**
   - Consider using secure storage for sensitive tokens
   - Implement data caching strategies

## Usage Examples

### Connect a Platform

```typescript
import socialPlatformManager from '../services/social_platform_manager';

const connectFacebook = async () => {
  const result = await socialPlatformManager.authenticatePlatform('facebook');
  if (result.success) {
    // OAuth flow initiated, handle callback in deep link handler
  }
};
```

### Get User Data

```typescript
import facebookService from '../services/facebook_service';

const getUserProfile = async () => {
  const result = await facebookService.getUserProfile();
  if (result.success) {
    console.log('User profile:', result.data);
  }
};
```

### Check Connection Status

```typescript
const checkConnections = async () => {
  const statuses = await socialPlatformManager.getAllConnectionStatuses();
  console.log('Connection statuses:', statuses);
};
```

### Sync All Platforms

```typescript
const syncData = async () => {
  const result = await socialPlatformManager.syncAllPlatforms();
  if (result.success) {
    console.log('Synced data:', result.data);
  }
};
```

## File Structure

```
src/
├── constants/
│   └── social_platforms.ts     # API configuration
├── types/
│   └── social_platforms.ts     # TypeScript types
├── utils/
│   └── oauth_helper.ts         # OAuth utilities
├── services/
│   ├── facebook_service.ts     # Facebook API service
│   ├── instagram_service.ts    # Instagram API service
│   ├── tiktok_service.ts       # TikTok API service
│   ├── spotify_service.ts      # Spotify API service
│   └── social_platform_manager.ts # Unified manager
├── components/
│   └── social_platform_card.tsx # Platform connection card
└── screens/
    └── social_connections_screen.tsx # Main connections UI
```

## API Endpoints Ready to Use

Each service provides these methods:
- `authenticate()` - Start OAuth flow
- `handleAuthCallback(code, state)` - Complete OAuth
- `getUserProfile()` - Get user data
- `disconnect()` - Remove connection
- `isConnected()` - Check connection status

Platform-specific methods:
- **Facebook**: `getUserPosts()`, `getUserPages()`
- **Instagram**: `getUserMedia()`
- **TikTok**: `getUserVideos()`
- **Spotify**: `getTopTracks()`, `getRecentlyPlayed()`, `getUserPlaylists()`

## Security Notes

- Store API secrets securely (consider using react-native-keychain)
- Validate state parameters in OAuth callbacks
- Implement proper token rotation
- Use HTTPS for all redirect URIs
- Consider implementing token encryption

## Troubleshooting

### Common Issues

1. **OAuth Redirect Not Working**
   - Check deep linking configuration
   - Verify redirect URIs match in platform console

2. **Token Expired Errors**
   - Implement automatic token refresh
   - Check token expiration handling

3. **API Rate Limits**
   - Implement exponential backoff
   - Cache responses when possible

### Debug Mode

Enable debug logging by uncommenting console.log statements in service files.

## Next Steps

1. Set up your developer accounts on each platform
2. Configure deep linking for OAuth callbacks
3. Test the authentication flow
4. Implement token refresh logic
5. Add error handling and user feedback
6. Style the UI components to match your app

The foundation is solid - you just need to wire up the OAuth callbacks and you'll be ready to go! 🚀 