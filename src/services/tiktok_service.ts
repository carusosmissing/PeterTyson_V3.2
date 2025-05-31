import { SOCIAL_PLATFORMS, OAUTH_ENDPOINTS, PLATFORM_NAMES } from '../constants/social_platforms';
import {
  SocialPlatformService,
  SocialAPIResponse,
  OAuthToken,
  TikTokUser,
  TikTokVideo,
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

class TikTokService implements SocialPlatformService {
  private platform = PLATFORM_NAMES.TIKTOK;
  private config = SOCIAL_PLATFORMS.TIKTOK;
  private endpoints = OAUTH_ENDPOINTS.TIKTOK;

  /**
   * Initiate TikTok OAuth authentication
   */
  async authenticate(): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      const state = generateState();
      const authUrl = generateAuthUrl(
        this.endpoints.AUTHORIZE,
        this.config.CLIENT_KEY,
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
      console.error('TikTok authentication error:', error);
      return {
        success: false,
        error: {
          code: 'AUTH_ERROR',
          message: 'Failed to initiate TikTok authentication',
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
        this.config.CLIENT_KEY,
        this.config.CLIENT_SECRET,
        this.config.REDIRECT_URI
      );

      if (!tokenResponse.success || !tokenResponse.data) {
        return tokenResponse;
      }

      await storeToken(this.platform, tokenResponse.data);
      return tokenResponse;
    } catch (error) {
      console.error('TikTok callback error:', error);
      return {
        success: false,
        error: {
          code: 'CALLBACK_ERROR',
          message: 'Failed to handle TikTok authentication callback',
          details: error,
        },
      };
    }
  }

  /**
   * Get TikTok user profile
   */
  async getUserProfile(): Promise<SocialAPIResponse<TikTokUser>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No TikTok token found. Please authenticate first.',
          },
        };
      }

      if (isTokenExpired(token)) {
        return {
          success: false,
          error: {
            code: 'TOKEN_EXPIRED',
            message: 'TikTok token has expired. Please re-authenticate.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/${this.config.API_VERSION}/user/info/`,
        {
          method: 'POST',
          headers: createAuthHeaders(token.access_token),
          body: JSON.stringify({
            fields: [
              'open_id',
              'union_id',
              'avatar_url',
              'avatar_url_100',
              'avatar_large_url',
              'display_name',
              'bio_description',
              'profile_deep_link',
              'is_verified',
              'follower_count',
              'following_count',
              'likes_count',
              'video_count'
            ]
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        return {
          success: false,
          error: {
            code: result.error?.code || 'API_ERROR',
            message: result.error?.message || 'Failed to fetch TikTok profile',
            details: result,
          },
        };
      }

      await storeUserData(this.platform, result.data);

      return {
        success: true,
        data: result.data as TikTokUser,
      };
    } catch (error) {
      console.error('TikTok profile fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching TikTok profile',
          details: error,
        },
      };
    }
  }

  /**
   * Get user's TikTok videos
   */
  async getUserVideos(limit: number = 20): Promise<SocialAPIResponse<TikTokVideo[]>> {
    try {
      const token = await getStoredToken(this.platform);
      if (!token) {
        return {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No TikTok token found. Please authenticate first.',
          },
        };
      }

      const response = await fetch(
        `${this.config.BASE_URL}/${this.config.API_VERSION}/video/list/`,
        {
          method: 'POST',
          headers: createAuthHeaders(token.access_token),
          body: JSON.stringify({
            max_count: limit,
            fields: [
              'id',
              'title',
              'video_description',
              'duration',
              'height',
              'width',
              'cover_image_url',
              'shareable_url',
              'embed_html',
              'embed_link',
              'like_count',
              'comment_count',
              'share_count',
              'view_count',
              'create_time'
            ]
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        return {
          success: false,
          error: {
            code: result.error?.code || 'API_ERROR',
            message: result.error?.message || 'Failed to fetch TikTok videos',
            details: result,
          },
        };
      }

      return {
        success: true,
        data: result.data?.videos || [],
        pagination: result.data?.cursor ? {
          next: result.data.cursor,
        } : undefined,
      };
    } catch (error) {
      console.error('TikTok videos fetch error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while fetching TikTok videos',
          details: error,
        },
      };
    }
  }

  /**
   * Refresh TikTok access token
   */
  async refreshToken(refreshToken: string): Promise<SocialAPIResponse<OAuthToken>> {
    try {
      const response = await fetch(`${this.config.BASE_URL}/${this.config.API_VERSION}/oauth/refresh_token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_key: this.config.CLIENT_KEY,
          client_secret: this.config.CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        return {
          success: false,
          error: {
            code: result.error?.code || 'REFRESH_FAILED',
            message: result.error?.message || 'Failed to refresh TikTok token',
            details: result,
          },
        };
      }

      const newToken: OAuthToken = {
        access_token: result.data.access_token,
        refresh_token: result.data.refresh_token,
        expires_in: result.data.expires_in,
        token_type: 'Bearer',
        scope: result.data.scope,
      };

      await storeToken(this.platform, newToken);

      return {
        success: true,
        data: newToken,
      };
    } catch (error) {
      console.error('TikTok token refresh error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error while refreshing TikTok token',
          details: error,
        },
      };
    }
  }

  /**
   * Disconnect TikTok account
   */
  async disconnect(): Promise<SocialAPIResponse<boolean>> {
    try {
      await removeStoredTokens(this.platform);
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      console.error('TikTok disconnect error:', error);
      return {
        success: false,
        error: {
          code: 'DISCONNECT_ERROR',
          message: 'Failed to disconnect TikTok account',
          details: error,
        },
      };
    }
  }

  /**
   * Check if user is connected to TikTok
   */
  async isConnected(): Promise<boolean> {
    const token = await getStoredToken(this.platform);
    return !!token && !isTokenExpired(token);
  }

  /**
   * Get cached user data
   */
  async getCachedUserData(): Promise<TikTokUser | null> {
    return getStoredUserData(this.platform);
  }
}

export default new TikTokService(); 