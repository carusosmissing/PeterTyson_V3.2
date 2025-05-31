import { PlatformName, PLATFORM_NAMES } from '../constants/social_platforms';
import {
  ConnectionStatus,
  SocialAPIResponse,
  OAuthToken,
  SocialPlatformData,
} from '../types/social_platforms';

import facebookService from './facebook_service';
import instagramService from './instagram_service';
import tiktokService from './tiktok_service';
import spotifyService from './spotify_service';

class SocialPlatformManager {
  private services = {
    [PLATFORM_NAMES.FACEBOOK]: facebookService,
    [PLATFORM_NAMES.INSTAGRAM]: instagramService,
    [PLATFORM_NAMES.TIKTOK]: tiktokService,
    [PLATFORM_NAMES.SPOTIFY]: spotifyService,
  };

  /**
   * Get service instance for a specific platform
   */
  getService(platform: PlatformName) {
    return this.services[platform];
  }

  /**
   * Initiate authentication for a specific platform
   */
  async authenticatePlatform(platform: PlatformName): Promise<SocialAPIResponse<OAuthToken>> {
    const service = this.getService(platform);
    return await service.authenticate();
  }

  /**
   * Handle OAuth callback for a specific platform
   */
  async handleAuthCallback(
    platform: PlatformName,
    code: string,
    state?: string
  ): Promise<SocialAPIResponse<OAuthToken>> {
    const service = this.getService(platform);
    return await service.handleAuthCallback(code, state);
  }

  /**
   * Disconnect a specific platform
   */
  async disconnectPlatform(platform: PlatformName): Promise<SocialAPIResponse<boolean>> {
    const service = this.getService(platform);
    return await service.disconnect();
  }

  /**
   * Get connection status for all platforms
   */
  async getAllConnectionStatuses(): Promise<Record<PlatformName, ConnectionStatus>> {
    const statuses: Record<string, ConnectionStatus> = {};

    for (const platform of Object.values(PLATFORM_NAMES)) {
      const service = this.getService(platform);
      const isConnected = await service.isConnected();
      
      let lastSync: string | undefined;
      let error: string | undefined;
      let requiresReauth = false;

      // Try to get user profile to check if token is still valid
      if (isConnected) {
        try {
          const profileResponse = await service.getUserProfile();
          if (!profileResponse.success) {
            if (profileResponse.error?.code === 'TOKEN_EXPIRED') {
              requiresReauth = true;
              error = 'Token expired';
            } else {
              error = profileResponse.error?.message;
            }
          } else {
            lastSync = new Date().toISOString();
          }
        } catch (err) {
          error = 'Connection check failed';
        }
      }

      statuses[platform] = {
        platform,
        is_connected: isConnected && !requiresReauth,
        last_sync: lastSync,
        error,
        requires_reauth: requiresReauth,
      };
    }

    return statuses as Record<PlatformName, ConnectionStatus>;
  }

  /**
   * Get connection status for a specific platform
   */
  async getConnectionStatus(platform: PlatformName): Promise<ConnectionStatus> {
    const allStatuses = await this.getAllConnectionStatuses();
    return allStatuses[platform];
  }

  /**
   * Sync data from all connected platforms
   */
  async syncAllPlatforms(): Promise<SocialAPIResponse<SocialPlatformData>> {
    try {
      const data: SocialPlatformData = {};
      const errors: string[] = [];

      // Facebook data
      if (await facebookService.isConnected()) {
        try {
          const [userProfile, posts, pages] = await Promise.all([
            facebookService.getUserProfile(),
            facebookService.getUserPosts(10),
            facebookService.getUserPages(),
          ]);

          if (userProfile.success && posts.success && pages.success) {
            data.facebook = {
              user: userProfile.data!,
              posts: posts.data!,
              pages: pages.data!,
            };
          }
        } catch (error) {
          errors.push(`Facebook sync failed: ${error}`);
        }
      }

      // Instagram data
      if (await instagramService.isConnected()) {
        try {
          const [userProfile, media] = await Promise.all([
            instagramService.getUserProfile(),
            instagramService.getUserMedia(10),
          ]);

          if (userProfile.success && media.success) {
            data.instagram = {
              user: userProfile.data!,
              media: media.data!,
            };
          }
        } catch (error) {
          errors.push(`Instagram sync failed: ${error}`);
        }
      }

      // TikTok data
      if (await tiktokService.isConnected()) {
        try {
          const [userProfile, videos] = await Promise.all([
            tiktokService.getUserProfile(),
            tiktokService.getUserVideos(10),
          ]);

          if (userProfile.success && videos.success) {
            data.tiktok = {
              user: userProfile.data!,
              videos: videos.data!,
            };
          }
        } catch (error) {
          errors.push(`TikTok sync failed: ${error}`);
        }
      }

      // Spotify data
      if (await spotifyService.isConnected()) {
        try {
          const [userProfile, topTracks, playlists] = await Promise.all([
            spotifyService.getUserProfile(),
            spotifyService.getTopTracks('medium_term', 10),
            spotifyService.getUserPlaylists(10),
          ]);

          if (userProfile.success && topTracks.success && playlists.success) {
            data.spotify = {
              user: userProfile.data!,
              top_tracks: topTracks.data!,
              playlists: playlists.data!,
            };
          }
        } catch (error) {
          errors.push(`Spotify sync failed: ${error}`);
        }
      }

      return {
        success: true,
        data,
        error: errors.length > 0 ? {
          code: 'PARTIAL_SYNC_FAILED',
          message: `Some platforms failed to sync: ${errors.join(', ')}`,
        } : undefined,
      };
    } catch (error) {
      console.error('Sync all platforms error:', error);
      return {
        success: false,
        error: {
          code: 'SYNC_ERROR',
          message: 'Failed to sync platform data',
          details: error,
        },
      };
    }
  }

  /**
   * Refresh tokens for all connected platforms
   */
  async refreshAllTokens(): Promise<Record<PlatformName, SocialAPIResponse<OAuthToken>>> {
    const results: Record<string, SocialAPIResponse<OAuthToken>> = {};

    for (const platform of Object.values(PLATFORM_NAMES)) {
      const service = this.getService(platform);
      
      try {
        // Check if platform is connected and has a refresh token
        const isConnected = await service.isConnected();
        if (isConnected) {
          // This would need the actual refresh token from storage
          // For now, just return a placeholder result
          results[platform] = {
            success: false,
            error: {
              code: 'NOT_IMPLEMENTED',
              message: 'Token refresh not implemented - developers should implement this based on platform requirements',
            },
          };
        } else {
          results[platform] = {
            success: false,
            error: {
              code: 'NOT_CONNECTED',
              message: `${platform} is not connected`,
            },
          };
        }
      } catch (error) {
        results[platform] = {
          success: false,
          error: {
            code: 'REFRESH_ERROR',
            message: `Error refreshing ${platform} token`,
            details: error,
          },
        };
      }
    }

    return results as Record<PlatformName, SocialAPIResponse<OAuthToken>>;
  }

  /**
   * Get list of connected platforms
   */
  async getConnectedPlatforms(): Promise<PlatformName[]> {
    const connected: PlatformName[] = [];

    for (const platform of Object.values(PLATFORM_NAMES)) {
      const service = this.getService(platform);
      if (await service.isConnected()) {
        connected.push(platform);
      }
    }

    return connected;
  }

  /**
   * Get count of connected platforms
   */
  async getConnectedCount(): Promise<number> {
    const connected = await this.getConnectedPlatforms();
    return connected.length;
  }

  /**
   * Check if any platforms are connected
   */
  async hasAnyConnections(): Promise<boolean> {
    const count = await this.getConnectedCount();
    return count > 0;
  }
}

export default new SocialPlatformManager(); 