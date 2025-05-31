import { SOCIAL_PLATFORMS, OAUTH_ENDPOINTS, PLATFORM_NAMES } from '../constants/social_platforms';
import {
  SocialPlatformService,
  SocialAPIResponse,
  OAuthToken,
  FacebookUser,
  FacebookPost,
  FacebookPage,
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

class FacebookService implements SocialPlatformService {
  private platform = PLATFORM_NAMES.FACEBOOK;
  private config = SOCIAL_PLATFORMS.FACEBOOK;
  private endpoints = OAUTH_ENDPOINTS.FACEBOOK;

  /**
   * Initiate Facebook OAuth authentication
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

      // Store state for validation (you'll need to implement state validation)
      await openAuthUrl(authUrl);

      // Note: In a real implementation, you'd handle the redirect callback
      // This is where your developers will need to implement the callback handling
      return {
        success: true,
        data: {
          access_token: 'pending_callback',
          token_type: 'Bearer',
        },
      };
    } catch (error) {
      console.error('Facebook authentication error:', error);
      return {
        success: false,
        error: {
          code: 'AUTH_ERROR',
          message: 'Failed to initiate Facebook authentication',
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
      // Exchange code for token
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

      // Store the token
      await storeToken(this.platform, tokenResponse.data);

      return tokenResponse;
    } catch (error) {
      console.error('Facebook callback error:', error);
      return {
        success: false,
        error: {
          code: 'CALLBACK_ERROR',
          message: 'Failed to handle Facebook authentication callback',
          details: error,
        },
      };
    }
  }

  /**
   * Get Facebook user profile
   */
  async getUserProfile(): Promise<SocialAPIResponse<FacebookUser>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Facebook token found. Please authenticate first.',
          },
        };
      }

      if (isTokenExpired(token)) {
        return {
          success: false,
          error: {
            code: 'TOKEN_EXPIRED',
            message: 'Facebook token has expired. Please re-authenticate.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/${this.config.API_VERSION}/me?fields=id,name,email,picture`,
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
            message: data.error?.message || 'Failed to fetch Facebook profile',
            details: data,
          },
        };
      }

      // Store user data locally
      await storeUserData(this.platform, data);

      return {
        success: true,
        data: data as FacebookUser,
      };
    } catch (error) {
      console.error('Facebook profile fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching Facebook profile',
          details: error,
        },
      };
    }
  }

  /**
   * Get user's Facebook posts
   */
  async getUserPosts(limit: number = 25): Promise<SocialAPIResponse<FacebookPost[]>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Facebook token found. Please authenticate first.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/${this.config.API_VERSION}/me/posts?limit=${limit}&fields=id,message,story,created_time,updated_time,attachments`,
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
            message: data.error?.message || 'Failed to fetch Facebook posts',
            details: data,
          },
        };
      }

      return {
        success: true,
        data: data.data as FacebookPost[],
        pagination: data.paging ? {
          next: data.paging.next,
          previous: data.paging.previous,
        } : undefined,
      };
    } catch (error) {
      console.error('Facebook posts fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching Facebook posts',
          details: error,
        },
      };
    }
  }

  /**
   * Get user's Facebook pages
   */
  async getUserPages(): Promise<SocialAPIResponse<FacebookPage[]>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No Facebook token found. Please authenticate first.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/${this.config.API_VERSION}/me/accounts?fields=id,name,category,picture,access_token`,
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
            message: data.error?.message || 'Failed to fetch Facebook pages',
            details: data,
          },
        };
      }

      return {
        success: true,
        data: data.data as FacebookPage[],
      };
    } catch (error) {
      console.error('Facebook pages fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching Facebook pages',
          details: error,
        },
      };
    }
  }

  /**
   * Refresh Facebook access token
   */
  async refreshToken(refreshToken: string): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      // Facebook uses long-lived tokens, but this is the pattern for refresh
      const params = new URLSearchParams({
        grant_type: 'fb_exchange_token',
        client_id: this.config.APP_ID,
        client_secret: this.config.APP_SECRET,
        fb_exchange_token: refreshToken,
      });

      const response = await fetch(`${this.endpoints.TOKEN}?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error?.code || 'REFRESH_FAILED',
            message: data.error?.message || 'Failed to refresh Facebook token',
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
      console.error('Facebook token refresh error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while refreshing Facebook token',
          details: error,
        },
      };
    }
  }

  /**
   * Disconnect Facebook account
   */
  async disconnect(): Promise<SocialAPIResponse<boolean>> {
    try {
      await removeStoredTokens(this.platform);
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      console.error('Facebook disconnect error:', error);
      return {
        success: false,
        error: {
          code: 'DISCONNECT_ERROR',
          message: 'Failed to disconnect Facebook account',
          details: error,
        },
      };
    }
  }

  /**
   * Check if user is connected to Facebook
   */
  async isConnected(): Promise<boolean> {
    const token = await getStoredToken(this.platform);
    return !!token && !isTokenExpired(token);
  }

  /**
   * Get cached user data
   */
  async getCachedUserData(): Promise<FacebookUser | null> {
    return getStoredUserData(this.platform);
  }
}

export default new FacebookService(); 