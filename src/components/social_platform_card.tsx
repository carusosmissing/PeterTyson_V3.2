import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { PlatformName } from '../constants/social_platforms';
import { ConnectionStatus } from '../types/social_platforms';
import socialPlatformManager from '../services/social_platform_manager';

interface SocialPlatformCardProps {
  platform: PlatformName;
  status: ConnectionStatus;
  onStatusChange: () => void;
}

const PLATFORM_COLORS = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  tiktok: '#000000',
  spotify: '#1DB954',
} as const;

const PLATFORM_DISPLAY_NAMES = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  spotify: 'Spotify',
} as const;

const SocialPlatformCard: React.FC<SocialPlatformCardProps> = ({
  platform,
  status,
  onStatusChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const result = await socialPlatformManager.authenticatePlatform(platform);
      
      if (result.success) {
        Alert.alert(
          'Authentication Started',
          `Please complete the ${PLATFORM_DISPLAY_NAMES[platform]} authentication in your browser. Return to the app when finished.`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Developers will need to implement deep linking to handle the callback
                // For now, just refresh the status
                setTimeout(() => {
                  onStatusChange();
                }, 2000);
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Connection Failed',
          result.error?.message || `Failed to connect to ${PLATFORM_DISPLAY_NAMES[platform]}`
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        `An error occurred while connecting to ${PLATFORM_DISPLAY_NAMES[platform]}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    Alert.alert(
      'Disconnect Account',
      `Are you sure you want to disconnect your ${PLATFORM_DISPLAY_NAMES[platform]} account?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              const result = await socialPlatformManager.disconnectPlatform(platform);
              
              if (result.success) {
                onStatusChange();
                Alert.alert(
                  'Success',
                  `${PLATFORM_DISPLAY_NAMES[platform]} account disconnected successfully`
                );
              } else {
                Alert.alert(
                  'Error',
                  result.error?.message || 'Failed to disconnect account'
                );
              }
            } catch (error) {
              Alert.alert('Error', 'An error occurred while disconnecting the account');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const getStatusColor = () => {
    if (status.is_connected) {
      return '#10B981'; // Green
    } else if (status.requires_reauth) {
      return '#F59E0B'; // Yellow/Orange
    } else {
      return '#6B7280'; // Gray
    }
  };

  const getStatusText = () => {
    if (status.is_connected) {
      return 'Connected';
    } else if (status.requires_reauth) {
      return 'Needs Re-authentication';
    } else {
      return 'Not Connected';
    }
  };

  const getActionButtonText = () => {
    if (status.is_connected) {
      return 'Disconnect';
    } else if (status.requires_reauth) {
      return 'Re-authenticate';
    } else {
      return 'Connect';
    }
  };

  const handleActionPress = () => {
    if (status.is_connected) {
      handleDisconnect();
    } else {
      handleConnect();
    }
  };

  return (
    <View style={[styles.container, { borderLeftColor: PLATFORM_COLORS[platform] }]}>
      <View style={styles.header}>
        <View style={styles.platformInfo}>
          <Text style={styles.platformName}>{PLATFORM_DISPLAY_NAMES[platform]}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: status.is_connected ? '#EF4444' : PLATFORM_COLORS[platform],
            },
          ]}
          onPress={handleActionPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.actionButtonText}>{getActionButtonText()}</Text>
          )}
        </TouchableOpacity>
      </View>

      {status.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {status.error}</Text>
        </View>
      )}

      {status.last_sync && (
        <View style={styles.syncContainer}>
          <Text style={styles.syncText}>
            Last synced: {new Date(status.last_sync).toLocaleString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
  },
  syncContainer: {
    marginTop: 8,
  },
  syncText: {
    color: '#6B7280',
    fontSize: 12,
  },
});

export default SocialPlatformCard; 