// Social Platform API Configuration
// Note: Replace placeholder values with actual API credentials from each platform's developer console

export const SOCIAL_PLATFORMS = {
  FACEBOOK: {
    APP_ID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || 'your_facebook_app_id',
    APP_SECRET: process.env.EXPO_PUBLIC_FACEBOOK_APP_SECRET || 'your_facebook_app_secret',
    REDIRECT_URI: 'https://your-app.com/auth/facebook/callback',
    SCOPES: [
      'email',
      'public_profile',
      'user_posts',
      'pages_read_engagement',
      'pages_show_list'
    ],
    API_VERSION: 'v18.0',
    BASE_URL: 'https://graph.facebook.com'
  },
  
  INSTAGRAM: {
    APP_ID: process.env.EXPO_PUBLIC_INSTAGRAM_APP_ID || 'your_instagram_app_id',
    APP_SECRET: process.env.EXPO_PUBLIC_INSTAGRAM_APP_SECRET || 'your_instagram_app_secret',
    REDIRECT_URI: 'https://your-app.com/auth/instagram/callback',
    SCOPES: [
      'user_profile',
      'user_media'
    ],
    BASE_URL: 'https://graph.instagram.com',
    BASIC_DISPLAY_URL: 'https://api.instagram.com'
  },
  
  TIKTOK: {
    CLIENT_KEY: process.env.EXPO_PUBLIC_TIKTOK_CLIENT_KEY || 'your_tiktok_client_key',
    CLIENT_SECRET: process.env.EXPO_PUBLIC_TIKTOK_CLIENT_SECRET || 'your_tiktok_client_secret',
    REDIRECT_URI: 'https://your-app.com/auth/tiktok/callback',
    SCOPES: [
      'user.info.basic',
      'video.list',
      'video.upload'
    ],
    BASE_URL: 'https://open-api.tiktok.com',
    API_VERSION: 'v1'
  },
  
  SPOTIFY: {
    CLIENT_ID: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || 'your_spotify_client_id',
    CLIENT_SECRET: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET || 'your_spotify_client_secret',
    REDIRECT_URI: 'https://your-app.com/auth/spotify/callback',
    SCOPES: [
      'user-read-private',
      'user-read-email',
      'user-top-read',
      'user-read-recently-played',
      'playlist-read-private',
      'playlist-read-collaborative'
    ],
    BASE_URL: 'https://api.spotify.com/v1',
    AUTH_URL: 'https://accounts.spotify.com'
  }
} as const;

export const OAUTH_ENDPOINTS = {
  FACEBOOK: {
    AUTHORIZE: 'https://www.facebook.com/v18.0/dialog/oauth',
    TOKEN: 'https://graph.facebook.com/v18.0/oauth/access_token'
  },
  INSTAGRAM: {
    AUTHORIZE: 'https://api.instagram.com/oauth/authorize',
    TOKEN: 'https://api.instagram.com/oauth/access_token'
  },
  TIKTOK: {
    AUTHORIZE: 'https://www.tiktok.com/auth/authorize/',
    TOKEN: 'https://open-api.tiktok.com/oauth/access_token/'
  },
  SPOTIFY: {
    AUTHORIZE: 'https://accounts.spotify.com/authorize',
    TOKEN: 'https://accounts.spotify.com/api/token'
  }
} as const;

export const PLATFORM_NAMES = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  SPOTIFY: 'spotify'
} as const;

export type PlatformName = typeof PLATFORM_NAMES[keyof typeof PLATFORM_NAMES]; 