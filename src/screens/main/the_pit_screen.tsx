import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars, Badges } from '../../constants';
import { Container } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const ThePitScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
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

  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={Images.logo} style={styles.logoImage} />
            <TouchableOpacity>
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

        {/* TBD Section */}
        <View style={styles.tbdSection}>
          <Text style={styles.tbdText}>TBD</Text>
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
          <View style={styles.prestigeRow}>
            <View style={styles.prestigeContent}>
              <Text style={styles.prestigePoints}>162,000</Text>
              <Text style={styles.prestigeLabel}>Prestige Points</Text>
            </View>
            
            {/* Badges */}
            <View style={styles.badgesContainer}>
              <Image source={Badges.dummyBadges} style={styles.badgesImage} />
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
    fontWeight: '600',
    color: '#FFFFFF',
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
  tbdSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tbdText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.8,
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
  prestigeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
  },
  badgesContainer: {
    position: 'relative',
    marginLeft: -30,
    marginTop: -15,
  },
  badgesImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  prestigeContent: {
    alignItems: 'flex-start',
    flex: 1,
  },
  prestigePoints: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  prestigeLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  badgeNotification: {
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
  badgeNotificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  tasksSection: {
    gap: 8,
    paddingBottom: 100,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 19, 67, 0.8)',
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
  },
  taskRight: {
    alignItems: 'flex-end',
  },
  taskPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taskPointsLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.6,
  },
});
