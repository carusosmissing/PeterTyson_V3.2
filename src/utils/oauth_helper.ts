import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { OAuthToken, SocialAPIResponse } from '../types/social_platforms';
import { PlatformName } from '../constants/social_platforms';

// Storage keys for different platforms
const STORAGE_KEYS = {
  ACCESS_TOKEN: (platform: PlatformName) => `${platform}_access_token`,
  REFRESH_TOKEN: (platform: PlatformName) => `${platform}_refresh_token`,
  EXPIRES_AT: (platform: PlatformName) => `${platform}_expires_at`,
  USER_DATA: (platform: PlatformName) => `${platform}_user_data`,
} as const;

/**
 * Generate OAuth authorization URL with proper parameters
 */
export const generateAuthUrl = (
  authUrl: string,
  clientId: string,
  redirectUri: string,
  scopes: string[],
  state?: string
): string => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    response_type: 'code',
    ...(state && { state }),
  });

  return `${authUrl}?${params.toString()}`;
};

/**
 * Generate a random state parameter for OAuth security
 */
export const generateState = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Parse authorization code from redirect URL
 */
export const parseAuthorizationCode = (url: string): { code?: string; state?: string; error?: string } => {
  try {
    const urlObj = new URL(url);
    const code = urlObj.searchParams.get('code');
    const state = urlObj.searchParams.get('state');
    const error = urlObj.searchParams.get('error');
    
    return { code: code || undefined, state: state || undefined, error: error || undefined };
  } catch (error) {
    console.error('Error parsing authorization code:', error);
    return { error: 'Invalid URL format' };
  }
};

/**
 * Store OAuth token securely
 */
export const storeToken = async (
  platform: PlatformName,
  token: OAuthToken
): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN(platform), token.access_token);
    
    if (token.refresh_token) {
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN(platform), token.refresh_token);
    }
    
    if (token.expires_in) {
      const expiresAt = Date.now() + (token.expires_in * 1000);
      await AsyncStorage.setItem(STORAGE_KEYS.EXPIRES_AT(platform), expiresAt.toString());
    }
  } catch (error) {
    console.error(`Error storing ${platform} token:`, error);
    throw error;
  }
};

/**
 * Retrieve stored OAuth token
 */
export const getStoredToken = async (platform: PlatformName): Promise<OAuthToken | null> => {
  try {
    const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN(platform));
    if (!accessToken) return null;

    const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN(platform));
    const expiresAtStr = await AsyncStorage.getItem(STORAGE_KEYS.EXPIRES_AT(platform));
    
    return {
      access_token: accessToken,
      refresh_token: refreshToken || undefined,
      expires_at: expiresAtStr ? parseInt(expiresAtStr) : undefined,
      token_type: 'Bearer',
    };
  } catch (error) {
    console.error(`Error retrieving ${platform} token:`, error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: OAuthToken): boolean => {
  if (!token.expires_at) return false;
  return Date.now() >= token.expires_at;
};

/**
 * Remove stored tokens for a platform
 */
export const removeStoredTokens = async (platform: PlatformName): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN(platform),
      STORAGE_KEYS.REFRESH_TOKEN(platform),
      STORAGE_KEYS.EXPIRES_AT(platform),
      STORAGE_KEYS.USER_DATA(platform),
    ]);
  } catch (error) {
    console.error(`Error removing ${platform} tokens:`, error);
    throw error;
  }
};

/**
 * Store user data for a platform
 */
export const storeUserData = async (
  platform: PlatformName,
  userData: any
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA(platform),
      JSON.stringify(userData)
    );
  } catch (error) {
    console.error(`Error storing ${platform} user data:`, error);
    throw error;
  }
};

/**
 * Retrieve stored user data
 */
export const getStoredUserData = async (platform: PlatformName): Promise<any | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA(platform));
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error(`Error retrieving ${platform} user data:`, error);
    return null;
  }
};

/**
 * Generic OAuth token exchange
 */
export const exchangeCodeForToken = async (
  tokenUrl: string,
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  additionalParams?: Record<string, string>
): Promise<SocialAPIResponse<OAuthToken>> => {
  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      ...additionalParams,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: data.error || 'TOKEN_EXCHANGE_FAILED',
          message: data.error_description || 'Failed to exchange code for token',
          details: data,
        },
      };
    }

    return {
      success: true,
      data: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        token_type: data.token_type || 'Bearer',
        scope: data.scope,
      },
    };
  } catch (error) {
    console.error('Token exchange error:', error);
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Network error during token exchange',
        details: error,
      },
    };
  }
};

/**
 * Open OAuth URL in browser/webview
 */
export const openAuthUrl = async (url: string): Promise<void> => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      throw new Error(`Cannot open URL: ${url}`);
    }
  } catch (error) {
    console.error('Error opening auth URL:', error);
    throw error;
  }
};

/**
 * Create authorization headers for API requests
 */
export const createAuthHeaders = (accessToken: string): Record<string, string> => {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}; 