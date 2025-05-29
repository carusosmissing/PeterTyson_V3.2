import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars, Trustubs } from '../../constants';
import { Container, TrustubCarousel } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const TheShrineScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);

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
    },
    {
      id: '2',
      stubNumber: '#01640',
      year: '2025',
      artist: 'Lady Gaga',
      venue: 'Hollywood Bowl',
      image: Trustubs.trustub2,
    },
    {
      id: '3',
      stubNumber: '#01230',
      year: '2024',
      artist: 'Fred Again',
      venue: 'Madison Square Garden',
      image: Trustubs.trustub3,
    },
    {
      id: '4',
      stubNumber: '#01241',
      year: '2024',
      artist: 'TruEXP',
      venue: 'Early Adopter',
      image: Trustubs.trustub4,
    },
  ];

  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea padding={false}>
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

        {/* Trustub Carousel */}
        <View style={styles.carouselContainer}>
          <TrustubCarousel trustubs={trustubsData} />
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
    tintColor: '#FFFFFF',
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
    tintColor: '#FFFFFF',
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
  carouselContainer: {
    flex: 1,
    marginHorizontal: 0, // No margin needed since container has no padding
    marginTop: 10, // Add top margin to prevent carousel from being cut off
  },
});
