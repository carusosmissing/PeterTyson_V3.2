import { SOCIAL_PLATFORMS, OAUTH_ENDPOINTS, PLATFORM_NAMES } from '../constants/social_platforms';
import {
  SocialPlatformService,
  SocialAPIResponse,
  OAuthToken,
  SpotifyUser,
  SpotifyTrack,
  SpotifyPlaylist,
} from '../types/social_platforms';
import {
  generateAuthUrl,
  generateState,
  exchangeCodeForToken,
  storeToken,
  getStoredToken,
  removeStoredTokens,
  createAuthHeaders,
  isTokenExpired,
  openAuthUrl,
  storeUserData,
  getStoredUserData,
} from '../utils/oauth_helper';

class SpotifyService implements SocialPlatformService {
  private platform = PLATFORM_NAMES.SPOTIFY;
  private config = SOCIAL_PLATFORMS.SPOTIFY;
  private endpoints = OAUTH_ENDPOINTS.SPOTIFY;

  /**
   * Initiate Spotify OAuth authentication
   */
  async authenticate(): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      const state = generateState();
      const authUrl = generateAuthUrl(
        this.endpoints.AUTHORIZE,
        this.config.CLIENT_ID,
        this.config.REDIRECT_URI,
        [...this.config.SCOPES],
        state
      );

      await openAuthUrl(authUrl);

      return {
        success: true,
        data: {
          access_token: 'pending_callback',
          token_type: 'Bearer',
        },
      };
    } catch (error) {
      console.error('Spotify authentication error:', error);
      return {
        success: false,
        error: {
          code: 'AUTH_ERROR',
          message: 'Failed to initiate Spotify authentication',
          details: error,
        },
      };
    }
  }

  /**
   * Complete OAuth flow with authorization code
   */
  async handleAuthCallback(code: string, state?: string): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      const tokenResponse = await exchangeCodeForToken(
        this.endpoints.TOKEN,
        code,
        this.config.CLIENT_ID,
        this.config.CLIENT_SECRET,
        this.config.REDIRECT_URI
      );

      if (!tokenResponse.success || !tokenResponse.data) {
        return tokenResponse;
      }

      await storeToken(this.platform, tokenResponse.data);
      return tokenResponse;
    } catch (error) {
      console.error('Spotify callback error:', error);
      return {
        success: false,
        error: {
          code: 'CALLBACK_ERROR',
          message: 'Failed to handle Spotify authentication callback',
          details: error,
        },
      };
    }
  }

  /**
   * Get Spotify user profile
   */
  async getUserProfile(): Promise<SocialAPIResponse<SpotifyUser>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Spotify token found. Please authenticate first.',
          },
        };
      }

      if (isTokenExpired(token)) {
        return {
          success: false,
          error: {
            code: 'TOKEN_EXPIRED',
            message: 'Spotify token has expired. Please re-authenticate.',
          },
        };
      }

      const response = await fetch(`${this.config.BASE_URL}/me`, {
        headers: createAuthHeaders(token.access_token),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.status?.toString() || 'API_ERROR',
            message: data.error?.message || 'Failed to fetch Spotify profile',
            details: data,
          },
        };
      }

      await storeUserData(this.platform, data);

      return {
        success: true,
        data: data as SpotifyUser,
      };
    } catch (error) {
      console.error('Spotify profile fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching Spotify profile',
          details: error,
        },
      };
    }
  }

  /**
   * Get user's top tracks
   */
  async getTopTracks(
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit: number = 20
  ): Promise<SocialAPIResponse<SpotifyTrack[]>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Spotify token found. Please authenticate first.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
        {
          headers: createAuthHeaders(token.access_token),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.status?.toString() || 'API_ERROR',
            message: data.error?.message || 'Failed to fetch top tracks',
            details: data,
          },
        };
      }

      return {
        success: true,
        data: data.items as SpotifyTrack[],
        pagination: {
          total: data.total,
          next: data.next,
          previous: data.previous,
        },
      };
    } catch (error) {
      console.error('Spotify top tracks fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching top tracks',
          details: error,
        },
      };
    }
  }

  /**
   * Get user's recently played tracks
   */
  async getRecentlyPlayed(limit: number = 20): Promise<SocialAPIResponse<SpotifyTrack[]>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Spotify token found. Please authenticate first.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/me/player/recently-played?limit=${limit}`,
        {
          headers: createAuthHeaders(token.access_token),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.status?.toString() || 'API_ERROR',
            message: data.error?.message || 'Failed to fetch recently played tracks',
            details: data,
          },
        };
      }

      return {
        success: true,
        data: data.items.map((item: any) => item.track) as SpotifyTrack[],
        pagination: {
          next: data.next,
        },
      };
    } catch (error) {
      console.error('Spotify recently played fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching recently played tracks',
          details: error,
        },
      };
    }
  }

  /**
   * Get user's playlists
   */
  async getUserPlaylists(limit: number = 20): Promise<SocialAPIResponse<SpotifyPlaylist[]>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Spotify token found. Please authenticate first.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/me/playlists?limit=${limit}`,
        {
          headers: createAuthHeaders(token.access_token),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.status?.toString() || 'API_ERROR',
            message: data.error?.message || 'Failed to fetch playlists',
            details: data,
          },
        };
      }

      return {
        success: true,
        data: data.items as SpotifyPlaylist[],
        pagination: {
          total: data.total,
          next: data.next,
          previous: data.previous,
        },
      };
    } catch (error) {
      console.error('Spotify playlists fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching playlists',
          details: error,
        },
      };
    }
  }

  /**
   * Refresh Spotify access token
   */
  async refreshToken(refreshToken: string): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      const response = await fetch(this.endpoints.TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.config.CLIENT_ID}:${this.config.CLIENT_SECRET}`)}`,
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error || 'REFRESH_FAILED',
            message: data.error_description || 'Failed to refresh Spotify token',
            details: data,
          },
        };
      }

      const newToken: OAuthToken = {
        access_token: data.access_token,
        refresh_token: data.refresh_token || refreshToken, // Spotify may not return new refresh token
        expires_in: data.expires_in,
        token_type: data.token_type || 'Bearer',
        scope: data.scope,
      };

      await storeToken(this.platform, newToken);

      return {
        success: true,
        data: newToken,
      };
    } catch (error) {
      console.error('Spotify token refresh error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while refreshing Spotify token',
          details: error,
        },
      };
    }
  }

  /**
   * Disconnect Spotify account
   */
  async disconnect(): Promise<SocialAPIResponse<boolean>> {
    try {
      await removeStoredTokens(this.platform);
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      console.error('Spotify disconnect error:', error);
      return {
        success: false,
        error: {
          code: 'DISCONNECT_ERROR',
          message: 'Failed to disconnect Spotify account',
          details: error,
        },
      };
    }
  }

  /**
   * Check if user is connected to Spotify
   */
  async isConnected(): Promise<boolean> {
    const token = await getStoredToken(this.platform);
    return !!token && !isTokenExpired(token);
  }

  /**
   * Get cached user data
   */
  async getCachedUserData(): Promise<SpotifyUser | null> {
    return getStoredUserData(this.platform);
  }
}

export default new SpotifyService(); 