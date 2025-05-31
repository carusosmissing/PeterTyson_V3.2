import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PLATFORM_NAMES, PlatformName } from '../constants/social_platforms';
import { ConnectionStatus } from '../types/social_platforms';
import socialPlatformManager from '../services/social_platform_manager';
import SocialPlatformCard from '../components/social_platform_card';

const SocialConnectionsScreen: React.FC = () => {
  const [connectionStatuses, setConnectionStatuses] = useState<Record<PlatformName, ConnectionStatus> | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const loadConnectionStatuses = async () => {
    try {
      const statuses = await socialPlatformManager.getAllConnectionStatuses();
      setConnectionStatuses(statuses);
    } catch (error) {
      console.error('Error loading connection statuses:', error);
      Alert.alert('Error', 'Failed to load connection statuses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadConnectionStatuses();
    setIsRefreshing(false);
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      const result = await socialPlatformManager.syncAllPlatforms();
      
      if (result.success) {
        Alert.alert(
          'Sync Complete',
          'Successfully synced data from all connected platforms',
          [
            {
              text: 'OK',
              onPress: () => loadConnectionStatuses(),
            },
          ]
        );
      } else {
        Alert.alert(
          'Sync Failed',
          result.error?.message || 'Failed to sync platform data'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while syncing platforms');
    } finally {
      setIsSyncing(false);
    }
  };

  const getConnectedCount = (): number => {
    if (!connectionStatuses) return 0;
    return Object.values(connectionStatuses).filter(status => status.is_connected).length;
  };

  const hasConnectedPlatforms = (): boolean => {
    return getConnectedCount() > 0;
  };

  const getPlatformsNeedingReauth = (): PlatformName[] => {
    if (!connectionStatuses) return [];
    return Object.values(connectionStatuses)
      .filter(status => status.requires_reauth)
      .map(status => status.platform);
  };

  // Load connection statuses when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadConnectionStatuses();
    }, [])
  );

  // Initial load
  useEffect(() => {
    loadConnectionStatuses();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading connections...</Text>
      </View>
    );
  }

  const needsReauth = getPlatformsNeedingReauth();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Social Media Connections</Text>
          <Text style={styles.subtitle}>
            Connect your social media accounts to sync and manage your content
          </Text>
          
          {/* Connection Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{getConnectedCount()}</Text>
              <Text style={styles.summaryLabel}>Connected</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>4</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Warning for platforms needing reauth */}
        {needsReauth.length > 0 && (
          <View style={styles.warningContainer}>
            <Text style={styles.warningTitle}>⚠️ Attention Required</Text>
            <Text style={styles.warningText}>
              {needsReauth.length === 1 
                ? `${needsReauth[0]} needs to be re-authenticated`
                : `${needsReauth.length} platforms need to be re-authenticated`
              }
            </Text>
          </View>
        )}

        {/* Sync All Button */}
        {hasConnectedPlatforms() && (
          <View style={styles.syncContainer}>
            <TouchableOpacity
              style={[styles.syncButton, isSyncing && styles.syncButtonDisabled]}
              onPress={handleSyncAll}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.syncButtonText}>Sync All Platforms</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Platform Cards */}
        <View style={styles.platformsContainer}>
          {Object.values(PLATFORM_NAMES).map((platform) => {
            const status = connectionStatuses?.[platform];
            if (!status) return null;

            return (
              <SocialPlatformCard
                key={platform}
                platform={platform}
                status={status}
                onStatusChange={loadConnectionStatuses}
              />
            );
          })}
        </View>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpText}>
            • Make sure you have accounts with the platforms you want to connect
          </Text>
          <Text style={styles.helpText}>
            • Check your internet connection if experiencing issues
          </Text>
          <Text style={styles.helpText}>
            • Contact support if authentication fails repeatedly
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  warningContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
  },
  syncContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  syncButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  syncButtonDisabled: {
    opacity: 0.6,
  },
  syncButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  platformsContainer: {
    paddingBottom: 16,
  },
  helpContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default SocialConnectionsScreen; 