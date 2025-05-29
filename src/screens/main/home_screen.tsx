import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars, Trustubs } from '../../constants';
import { Container } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const handleMenuToggle = () => {
    navigation.navigate('Settings' as never);
  };

  // Pulse animation effect
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, [pulseAnim]);

  const galleryItems = [
    {
      id: '#01230',
      artist: 'Kendrick Lamar',
      image: Trustubs.trustub1,
    },
    {
      id: '#01240',
      artist: 'Lady Gaga',
      image: Trustubs.trustub2,
    },
    {
      id: '#01241',
      artist: 'Fred Again',
      image: Trustubs.trustub3,
    },
    {
      id: '#01236',
      artist: 'TruEXP',
      subtitle: 'Early Adopter',
      image: Trustubs.trustub4,
    },
  ];

  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea padding={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleMenuToggle}>
              <Image source={Icons.menu} style={styles.menuIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}></Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
              <Image 
                source={getAvatarSource(userProfile?.avatar || 'pete', userProfile?.avatarType || 'asset')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationContainer} onPress={handleNotificationPress}>
              <Image source={Icons.notification} style={styles.notificationIcon} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Content with Padding */}
          <View style={styles.paddedContent}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <View style={styles.welcomeRow}>
                <View style={styles.welcomeTextContainer}>
                  <Text style={styles.welcomeTitle}>Welcome, {userProfile?.username || 'demo'}!</Text>
                  <Text style={styles.streakText}>You're on a 2 day streak!</Text>
                </View>
                
                {/* Prestige Points Bubble */}
                <View style={styles.prestigeBubble}>
                  <Text style={styles.prestigeBubbleLabel}>PRESTIGE</Text>
                  <Text style={styles.prestigeBubblePoints}>162K</Text>
                </View>
              </View>
            </View>

            {/* View Challenges Button */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity style={styles.challengesButton}>
                <Text style={styles.challengesButtonText}>Daily Check In</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Gallery Title */}
            <Text style={styles.galleryTitle}>The Gallery</Text>
          </View>

          {/* Gallery Grid - Full Width */}
          <View style={styles.galleryGrid}>
            <View style={styles.galleryRow}>
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[0].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[0].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[0].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.logoImage} />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[1].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[1].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[1].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.logoImage} />
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.galleryRow, styles.galleryRowSecond]}>
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[2].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[2].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[2].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.logoImage} />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[3].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[3].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[3].artist}</Text>
                  {galleryItems[3].subtitle && (
                    <Text style={styles.gallerySubtitle}>{galleryItems[3].subtitle}</Text>
                  )}
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.logoImage} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons with Padding */}
          <View style={styles.paddedContent}>
            <View style={styles.actionButtonsSection}>
              {/* Stats Section */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4</Text>
                  <Text style={styles.statLabel}>TruSTUBS</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4</Text>
                  <Text style={styles.statLabel}>Events</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>2</Text>
                  <Text style={styles.statLabel}>Venues</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 57,
    paddingBottom: 20,
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginLeft: 0,
  },
  logoImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.text.inverse,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginRight: 5,
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationIcon: {
    width: 28,
    height: 28,
    tintColor: Colors.text.inverse,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  welcomeSection: {
    marginBottom: 15,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  streakText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  challengesButton: {
    backgroundColor: '#091343',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  challengesButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  galleryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 0,
  },
  galleryGrid: {
    marginTop: -20,
    marginBottom: 5,
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  galleryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  galleryRowSecond: {
    marginTop: -66,
  },
  galleryItem: {
    flex: 1,
    height: 380,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  galleryOverlay: {
    position: 'absolute',
    top: 48,
    left: 9,
  },
  galleryId: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  galleryArtist: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gallerySubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    marginTop: 2,
  },
  actionButtonsSection: {
    gap: 15,
    marginBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2D3748',
    opacity: 0.3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  scrollContent: {
    flex: 1,
  },
  paddedContent: {
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  prestigeBubble: {
    backgroundColor: '#091343',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  prestigeBubbleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  prestigeBubblePoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoOverlay: {
    position: 'absolute',
    bottom: 45,
    right: 7,
    zIndex: 10,
  },
});
