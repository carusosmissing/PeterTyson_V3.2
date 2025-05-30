import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography, Spacing, Images, Icons, Avatars, Badges } from '../../constants';
import { Container } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

// Tier data
const tiers = {
  bronze: { min: 0, max: 100000, color: '#CD7F32' },
  silver: { min: 100000, max: 250000, color: '#C0C0C0' },
  gold: { min: 250000, max: 500000, color: '#FFD700' },
  platinum: { min: 500000, max: 1000000, color: '#E5E4E2' },
  diamond: { min: 1000000, max: 2000000, color: '#B9F2FF' },
};

const getCurrentTier = (points: number) => {
  for (const [tier, range] of Object.entries(tiers)) {
    if (points >= range.min && points < range.max) {
      // For silver tier (162k points), we want to show 66% progress
      if (tier === 'silver') {
        return {
          name: 'Platinum',
          color: range.color,
          progress: 66,
          pointsToNext: 88000,
        };
      }
      return {
        name: tier,
        color: range.color,
        progress: ((points - range.min) / (range.max - range.min)) * 100,
        pointsToNext: range.max - points,
      };
    }
  }
  return {
    name: 'diamond',
    color: tiers.diamond.color,
    progress: 100,
    pointsToNext: 0,
  };
};

const CircularProgressIndicator = ({ progress, color }: { progress: number; color: string }) => {
  const size = 100;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
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
        stroke={color}
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
  );
};

export const ThePitScreen: React.FC = () => {
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

  // Weekly calendar data
  const weekDays = [
    { day: 'Sun', completed: true },
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: false },
    { day: 'Wed', completed: false },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false },
  ];

  // Task data
  const tasks = [
    { id: 1, title: 'Daily Check In', points: 15, completed: true, icon: Icons.verified },
    { id: 2, title: 'Spotify: Listen to Abracadabra by Lady Gaga', points: 5, completed: true, icon: Icons.music },
    { id: 3, title: 'Rate It! Abracadabra by Lady Gaga', points: 5, completed: false, icon: Icons.star },
    { id: 4, title: 'Quiz: What\'s Your Listening Style?', points: 25, completed: false, icon: Icons.settings },
    { id: 5, title: 'Stub: React to 3 Stubs', points: 15, completed: true, icon: Icons.verified },
    { id: 6, title: 'Refer A Friend', points: 15, completed: true, icon: Icons.verified },
  ];

  // Profile images array
  const profileImages = [
    Avatars.user1,
    Avatars.user2,
    Avatars.user3,
    Avatars.user4,
    Avatars.user5,
  ];

  const handleProfileCirclePress = (index: number) => {
    // Navigate to the corresponding user profile screen
    switch (index) {
      case 0:
        navigation.navigate('ProfileUser1' as never);
        break;
      case 1:
        navigation.navigate('ProfileUser2' as never);
        break;
      case 2:
        navigation.navigate('ProfileUser3' as never);
        break;
      case 3:
        navigation.navigate('ProfileUser4' as never);
        break;
      case 4:
        navigation.navigate('ProfileUser5' as never);
        break;
      default:
        console.log('Invalid profile index:', index);
    }
  };

  return (
    <Container variant="image" backgroundImage={Images.bg7Background} safeArea>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={Images.logo} style={styles.logoImage} />
            <TouchableOpacity onPress={handleMenuToggle}>
              <Image source={Icons.menu} style={styles.menuIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>The Pit</Text>
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

        {/* Weekly Calendar */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarRow}>
            {weekDays.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.dayText}>{day.day}</Text>
                <View style={[styles.dayCheckbox, day.completed && styles.dayCheckboxCompleted]}>
                  {day.completed && <Image source={Icons.verified} style={styles.checkIcon} />}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Prestige Points Section */}
        <View style={styles.prestigeSection}>
          <View style={styles.prestigeContent}>
            <View style={styles.prestigeRow}>
              <View style={styles.prestigeRingContainer}>
                <View style={styles.prestigeProgressContainer}>
                  <CircularProgressIndicator
                    progress={getCurrentTier(162000).progress}
                    color={getCurrentTier(162000).color}
                  />
                  <View style={styles.prestigeInnerContent}>
                    <Text style={styles.prestigePoints}>162k</Text>
                    <Text style={styles.prestigeLabel}>Points</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>
                  {getCurrentTier(162000).name.toUpperCase()}
                </Text>
                <Text style={styles.tierProgress}>
                  {getCurrentTier(162000).pointsToNext.toLocaleString()} points to next tier
                </Text>
              </View>
            </View>
          </View>
          
          {/* Badges */}
          <View style={styles.badgesContainer}>
            <View style={styles.badgesRow}>
              <Image source={Badges.builder} style={styles.badgeImage} />
              <Image source={Badges.plugged} style={styles.badgeImage} />
              <Image source={Badges.streaker} style={styles.badgeImage} />
              <Image source={Badges.fullSend} style={styles.badgeImage} />
              <Image source={Badges.thinkTank} style={styles.badgeImage} />
            </View>
          </View>

          {/* Profile Row */}
          <View style={styles.profileRowContainer}>
            <View style={styles.profileRow}>
              {profileImages.map((image, index) => (
                <TouchableOpacity key={index} style={styles.profileCircle} onPress={() => handleProfileCirclePress(index)}>
                  <Image source={image} style={styles.profileCircleImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.tasksSection}>
          {tasks.map((task) => (
            <TouchableOpacity key={task.id} style={styles.taskItem}>
              <View style={styles.taskLeft}>
                <View style={[styles.taskIcon, task.completed && styles.taskIconCompleted]}>
                  <Image 
                    source={task.completed ? Icons.verified : task.icon} 
                    style={styles.taskIconImage} 
                  />
                </View>
                <Text style={styles.taskTitle}>{task.title}</Text>
              </View>
              <View style={styles.taskRight}>
                <Text style={styles.taskPoints}>{task.points}</Text>
                <Text style={styles.taskPointsLabel}>Points</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: Spacing.semantic.screenPadding - 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginLeft: -10,
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
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.secondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginRight: -5,
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
  calendarSection: {
    marginBottom: 30,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  dayContainer: {
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  dayCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCheckboxCompleted: {
    backgroundColor: '#091343',
    borderColor: '#091343',
  },
  checkIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  prestigeSection: {
    marginBottom: 30,
  },
  prestigeContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  prestigeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  prestigeRingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -20 }],
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
    width: 100,
    height: 100,
  },
  prestigePoints: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: -4,
  },
  prestigeLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  tierInfo: {
    alignItems: 'flex-start',
  },
  tierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: Typography.fontFamily.display,
  },
  tierProgress: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Typography.fontFamily.primary,
  },
  badgesContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(9, 19, 67, 0.75)',
    borderRadius: 16,
    padding: 2,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 0,
    justifyContent: 'center',
  },
  badgeImage: {
    width: 66,
    height: 66,
    resizeMode: 'contain',
  },
  tasksSection: {
    gap: 8,
    paddingBottom: 100,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 15,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskIconCompleted: {
    backgroundColor: Colors.primaryLight,
  },
  taskIconImage: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  taskTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    fontFamily: Typography.fontFamily.primary,
  },
  taskRight: {
    alignItems: 'flex-end',
  },
  taskPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.display,
  },
  taskPointsLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.6,
    fontFamily: Typography.fontFamily.primary,
  },
  profileRowContainer: {
    paddingHorizontal: 0,
    paddingTop: 20,
    paddingBottom: 0,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: -10,
    marginLeft: 5,
    gap: 8,
  },
  profileCircle: {
    width: 61,
    height: 61,
    borderRadius: 30.5,
    overflow: 'hidden',
  },
  profileCircleImage: {
    width: '100%',
    height: '100%',
  },
});
