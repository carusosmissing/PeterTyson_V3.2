import { SOCIAL_PLATFORMS, OAUTH_ENDPOINTS, PLATFORM_NAMES } from '../constants/social_platforms';
import {
  SocialPlatformService,
  SocialAPIResponse,
  OAuthToken,
  InstagramUser,
  InstagramMedia,
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

class InstagramService implements SocialPlatformService {
  private platform = PLATFORM_NAMES.INSTAGRAM;
  private config = SOCIAL_PLATFORMS.INSTAGRAM;
  private endpoints = OAUTH_ENDPOINTS.INSTAGRAM;

  /**
   * Initiate Instagram OAuth authentication
   */
  async authenticate(): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      const state = generateState();
      const authUrl = generateAuthUrl(
        this.endpoints.AUTHORIZE,
        this.config.APP_ID,
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
      console.error('Instagram authentication error:', error);
      return {
        success: false,
        error: {
          code: 'AUTH_ERROR',
          message: 'Failed to initiate Instagram authentication',
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
        this.config.APP_ID,
        this.config.APP_SECRET,
        this.config.REDIRECT_URI
      );

      if (!tokenResponse.success || !tokenResponse.data) {
        return tokenResponse;
      }

      await storeToken(this.platform, tokenResponse.data);
      return tokenResponse;
    } catch (error) {
      console.error('Instagram callback error:', error);
      return {
        success: false,
        error: {
          code: 'CALLBACK_ERROR',
          message: 'Failed to handle Instagram authentication callback',
          details: error,
        },
      };
    }
  }

  /**
   * Get Instagram user profile
   */
  async getUserProfile(): Promise<SocialAPIResponse<InstagramUser>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Instagram token found. Please authenticate first.',
          },
        };
      }

      if (isTokenExpired(token)) {
        return {
          success: false,
          error: {
            code: 'TOKEN_EXPIRED',
            message: 'Instagram token has expired. Please re-authenticate.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/me?fields=id,username,account_type,media_count`,
        {
          headers: createAuthHeaders(token.access_token),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.code || 'API_ERROR',
            message: data.error?.message || 'Failed to fetch Instagram profile',
            details: data,
          },
        };
      }

      await storeUserData(this.platform, data);

      return {
        success: true,
        data: data as InstagramUser,
      };
    } catch (error) {
      console.error('Instagram profile fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching Instagram profile',
          details: error,
        },
      };
    }
  }

  /**
   * Get user's Instagram media
   */
  async getUserMedia(limit: number = 25): Promise<SocialAPIResponse<InstagramMedia[]>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Instagram token found. Please authenticate first.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp,permalink,username&limit=${limit}`,
        {
          headers: createAuthHeaders(token.access_token),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.code || 'API_ERROR',
            message: data.error?.message || 'Failed to fetch Instagram media',
            details: data,
          },
        };
      }

      return {
        success: true,
        data: data.data as InstagramMedia[],
        pagination: data.paging ? {
          next: data.paging.next,
          previous: data.paging.previous,
        } : undefined,
      };
    } catch (error) {
      console.error('Instagram media fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching Instagram media',
          details: error,
        },
      };
    }
  }

  /**
   * Refresh Instagram access token
   */
  async refreshToken(refreshToken: string): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      const response = await fetch(`${this.config.BASE_URL}/refresh_access_token?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.code || 'REFRESH_FAILED',
            message: data.error?.message || 'Failed to refresh Instagram token',
            details: data,
          },
        };
      }

      const newToken: OAuthToken = {
        access_token: data.access_token,
        token_type: 'Bearer',
        expires_in: data.expires_in,
      };

      await storeToken(this.platform, newToken);

      return {
        success: true,
        data: newToken,
      };
    } catch (error) {
      console.error('Instagram token refresh error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while refreshing Instagram token',
          details: error,
        },
      };
    }
  }

  /**
   * Disconnect Instagram account
   */
  async disconnect(): Promise<SocialAPIResponse<boolean>> {
    try {
      await removeStoredTokens(this.platform);
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      console.error('Instagram disconnect error:', error);
      return {
        success: false,
        error: {
          code: 'DISCONNECT_ERROR',
          message: 'Failed to disconnect Instagram account',
          details: error,
        },
      };
    }
  }

  /**
   * Check if user is connected to Instagram
   */
  async isConnected(): Promise<boolean> {
    const token = await getStoredToken(this.platform);
    return !!token && !isTokenExpired(token);
  }

  /**
   * Get cached user data
   */
  async getCachedUserData(): Promise<InstagramUser | null> {
    return getStoredUserData(this.platform);
  }
}

export default new InstagramService(); 