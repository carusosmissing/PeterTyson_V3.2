import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars, Trustubs } from '../../constants';
import { Container, TrustubCarousel, TrustubGrid } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const TheShrineScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);
  const [viewType, setViewType] = useState<'carousel' | 'grid'>('carousel');

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const handleMenuToggle = () => {
    navigation.navigate('Settings' as never);
  };

  const trustubsData = [
    {
      id: '1',
      stubNumber: '#01236',
      year: '2024',
      artist: 'Kendrick Lamar',
      venue: 'The Forum',
      image: Trustubs.trustub1,
      notes: 'Pete somehow got backstage and freestyled with Kendrick in the green room. Security had to escort him out but not before Kendrick said "that dude\'s crazy talented!"',
    },
    {
      id: '2',
      stubNumber: '#01640',
      year: '2024',
      artist: 'Halsey',
      venue: 'Huntington Bank Pavilion',
      image: Trustubs.trustub2,
      notes: 'Pete crowd-surfed during "Without Me" and somehow made it all the way to the stage. Halsey laughed and gave him a high-five before security took him back.',
    },
    {
      id: '3',
      stubNumber: '#01230',
      year: '2025',
      artist: 'Under the Glow',
      venue: 'The Palladium',
      image: Trustubs.trustub3,
      notes: 'Pete brought glow sticks for the entire venue and started an epic glow stick war. The band loved it so much they dedicated their last song to "the glow stick guy."',
    },
    {
      id: '4',
      stubNumber: '#01241',
      year: '2024',
      artist: 'TruEXP',
      venue: 'Early Adopter',
      image: Trustubs.trustub4,
      notes: 'Pete figured out how to hack the VR experience and created a virtual Pete army. The developers were so impressed they offered him a job on the spot.',
    },
  ];

  return (
    <Container variant="image" backgroundImage={Images.welcomeBackground} safeArea padding={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={Images.logo} style={styles.logoImage} />
            <TouchableOpacity onPress={handleMenuToggle}>
              <Image source={Icons.menu} style={styles.menuIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>My Shrine</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
              <Image 
                source={getAvatarSource(userProfile?.avatar || 'petertyson', userProfile?.avatarType || 'asset')}
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

        {/* View Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={() => setViewType(viewType === 'carousel' ? 'grid' : 'carousel')}
          >
            <Text style={styles.toggleText}>
              {viewType === 'carousel' ? 'Carousel' : 'Grid'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trustub Views */}
        <View style={styles.viewContainer}>
          {viewType === 'carousel' ? (
            <TrustubCarousel trustubs={trustubsData} />
          ) : (
            <TrustubGrid trustubs={trustubsData} />
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0, // Removed padding so trustubs can extend to screen edges
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 57,
    paddingBottom: 20,
    paddingHorizontal: Spacing.semantic.screenPadding, // Add padding back to header only
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginLeft: 0,
  },
  logoImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.secondary,
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
  viewContainer: {
    flex: 1,
    marginHorizontal: 0, // No margin needed since container has no padding
    marginTop: 0, // Reduced since toggle provides spacing
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingTop: 0,
    paddingBottom: 8,
    marginTop: -20,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.secondary,
  },
});
