import { PlatformName } from '../constants/social_platforms';

// Base types for all platforms
export interface OAuthToken {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type: string;
  scope?: string;
  expires_at?: number;
}

export interface ConnectedAccount {
  id: string;
  platform: PlatformName;
  user_id: string;
  username: string;
  display_name: string;
  profile_picture?: string;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  connected_at: string;
  last_sync?: string;
  is_active: boolean;
}

// Facebook Types
export interface FacebookUser {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}

export interface FacebookPost {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  updated_time?: string;
  attachments?: {
    data: Array<{
      type: string;
      url?: string;
      media?: {
        image: {
          src: string;
        };
      };
    }>;
  };
}

export interface FacebookPage {
  id: string;
  name: string;
  category: string;
  picture?: {
    data: {
      url: string;
    };
  };
  access_token?: string;
}

// Instagram Types
export interface InstagramUser {
  id: string;
  username: string;
  account_type: 'PERSONAL' | 'BUSINESS';
  media_count?: number;
}

export interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
  permalink: string;
  username: string;
}

// TikTok Types
export interface TikTokUser {
  open_id: string;
  union_id: string;
  avatar_url: string;
  avatar_url_100: string;
  avatar_large_url: string;
  display_name: string;
  bio_description?: string;
  profile_deep_link: string;
  is_verified: boolean;
  follower_count?: number;
  following_count?: number;
  likes_count?: number;
  video_count?: number;
}

export interface TikTokVideo {
  id: string;
  title: string;
  video_description: string;
  duration: number;
  height: number;
  width: number;
  cover_image_url: string;
  shareable_url: string;
  embed_html: string;
  embed_link: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  view_count: number;
  create_time: number;
}

// Spotify Types
export interface SpotifyUser {
  id: string;
  display_name: string;
  email?: string;
  followers?: {
    total: number;
  };
  images?: Array<{
    height?: number;
    url: string;
    width?: number;
  }>;
  country: string;
  product: 'free' | 'premium';
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      height: number;
      url: string;
      width: number;
    }>;
  };
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  popularity: number;
  preview_url?: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description?: string;
  images?: Array<{
    height?: number;
    url: string;
    width?: number;
  }>;
  tracks: {
    total: number;
  };
  public: boolean;
  collaborative: boolean;
  owner: {
    id: string;
    display_name: string;
  };
}

// API Response Types
export interface SocialAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    next?: string;
    previous?: string;
    total?: number;
  };
}

// Service Method Types
export interface SocialPlatformService {
  authenticate(): Promise<SocialAPIResponse<OAuthToken>>;
  getUserProfile(): Promise<SocialAPIResponse<any>>;
  refreshToken(refreshToken: string): Promise<SocialAPIResponse<OAuthToken>>;
  disconnect(): Promise<SocialAPIResponse<boolean>>;
}

// Connection Status Types
export interface ConnectionStatus {
  platform: PlatformName;
  is_connected: boolean;
  last_sync?: string;
  error?: string;
  requires_reauth?: boolean;
}

export interface SocialPlatformData {
  facebook?: {
    user: FacebookUser;
    posts: FacebookPost[];
    pages: FacebookPage[];
  };
  instagram?: {
    user: InstagramUser;
    media: InstagramMedia[];
  };
  tiktok?: {
    user: TikTokUser;
    videos: TikTokVideo[];
  };
  spotify?: {
    user: SpotifyUser;
    top_tracks: SpotifyTrack[];
    playlists: SpotifyPlaylist[];
  };
} 