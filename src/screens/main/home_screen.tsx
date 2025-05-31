import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Images, Icons, Avatars, Trustubs } from '../../constants';
import { Container, StubModal } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

// Small version of CircularProgressIndicator for home screen
const SmallCircularProgressIndicator = ({ progress, color, isSparkle }: { progress: number; color: string; isSparkle?: boolean }) => {
  const size = 60;
  const strokeWidth = 6;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;
  
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSparkle) {
      // Create sparkle effect
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSparkle, sparkleAnim]);

  return (
    <Animated.View style={{
      opacity: isSparkle ? sparkleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.3]
      }) : 1,
      transform: [{
        scale: isSparkle ? sparkleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1]
        }) : 1
      }]
    }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="rgba(255, 255, 255, 0.2)"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <Circle
          stroke={isSparkle ? '#FFD700' : color}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
    </Animated.View>
  );
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // State for streak and sparkle effect
  const [streakCount, setStreakCount] = useState(2);
  const [isSparkle, setIsSparkle] = useState(false);
  
  // State for stub modal
  const [selectedStub, setSelectedStub] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleDailyCheckIn = () => {
    // Increment streak
    setStreakCount(prev => prev + 1);
    
    // Trigger sparkle effect
    setIsSparkle(true);
    
    // Reset sparkle after animation
    setTimeout(() => {
      setIsSparkle(false);
    }, 1000);
  };

  const handleStubPress = (stub: any) => {
    setSelectedStub(stub);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedStub(null);
  };

  const galleryItems = [
    {
      id: '#01230',
      artist: 'Kendrick Lamar',
      image: Trustubs.trustub1,
    },
    {
      id: '#01240',
      artist: 'Halsey',
      image: Trustubs.trustub2,
    },
    {
      id: '#01241',
      artist: 'Under the Glow',
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
    <Container variant="image" backgroundImage={Images.bg6Background} safeArea padding={false}>
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

        {/* Scrollable Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Content with Padding */}
          <View style={styles.paddedContent}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <View style={styles.welcomeRow}>
                <View style={styles.welcomeTextContainer}>
                  <Text style={styles.welcomeTitle}>Welcome, {userProfile?.username || 'demo'}!</Text>
                  <Text style={styles.streakText}>You're on a {streakCount} day streak!</Text>
                </View>
                
                {/* Prestige Progress Ring */}
                <View style={styles.prestigeRingContainer}>
                  <View style={styles.prestigeProgressContainer}>
                    <SmallCircularProgressIndicator
                      progress={66}
                      color="#C0C0C0"
                      isSparkle={isSparkle}
                    />
                    <View style={styles.prestigeInnerContent}>
                      <Text style={styles.prestigePoints}>162k</Text>
                      <Text style={styles.prestigeLabel}>Points</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* View Challenges Button */}
            <Animated.View style={[{ transform: [{ scale: pulseAnim }] }, styles.buttonContainer]}>
              <TouchableOpacity style={styles.challengesButton} onPress={handleDailyCheckIn}>
                <Text style={styles.challengesButtonText}>Daily Check In</Text>
                <View style={styles.buttonGlow} />
              </TouchableOpacity>
            </Animated.View>

            {/* Gallery Title */}
            <Text style={styles.galleryTitle}>The Gallery</Text>
          </View>

          {/* Gallery Grid - Full Width */}
          <View style={styles.galleryGrid}>
            <View style={styles.galleryRow}>
              <TouchableOpacity style={styles.galleryItem} onPress={() => handleStubPress(galleryItems[0])}>
                <Image source={galleryItems[0].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[0].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[0].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.galleryLogoImage} />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryItem} onPress={() => handleStubPress(galleryItems[1])}>
                <Image source={galleryItems[1].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[1].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[1].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.galleryLogoImage} />
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.galleryRow, styles.galleryRowSecond]}>
              <TouchableOpacity style={styles.galleryItem} onPress={() => handleStubPress(galleryItems[2])}>
                <Image source={galleryItems[2].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[2].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[2].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.galleryLogoImage} />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryItem} onPress={() => handleStubPress(galleryItems[3])}>
                <Image source={galleryItems[3].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[3].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[3].artist}</Text>
                  {galleryItems[3].subtitle && (
                    <Text style={styles.gallerySubtitle}>{galleryItems[3].subtitle}</Text>
                  )}
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Images.logo} style={styles.galleryLogoImage} />
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

      {/* Stub Modal */}
      <StubModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        stub={selectedStub}
      />
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
    width: 32,
    height: 32,
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
    justifyContent: 'space-between',
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
  buttonContainer: {
    shadowColor: '#4C6FFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 15,
  },
  challengesButton: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#4C6FFF',  // Primary color
    borderWidth: 1,
    borderColor: '#6B4CFF',  // Secondary color for gradient-like effect
  },
  challengesButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
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
  prestigeRingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  prestigeProgressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prestigeInnerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  prestigePoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: -2,
  },
  prestigeLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  logoOverlay: {
    position: 'absolute',
    bottom: 45,
    right: 7,
    zIndex: 10,
  },
  galleryLogoImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
