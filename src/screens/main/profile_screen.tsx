import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Layout, Assets, Icons } from '../../constants';
import { Avatar } from '../../components/ui/avatar';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state: any) => state.user.profile);

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    navigation.navigate('EditProfile' as never);
  };

  const handleMenuPress = (item: string) => {
    console.log(`${item} pressed`);
  };

  const handleSignOut = () => {
    // Dispatch logout action to clear auth state
    dispatch(logout());
    
    // Navigate back to auth stack (welcome screen)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' as never }],
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const menuItems = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: Assets.Icons.settings,
      onPress: () => handleMenuPress('Account Settings'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Assets.Icons.notification,
      onPress: () => handleMenuPress('Notifications'),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Assets.Icons.camera,
      onPress: () => handleMenuPress('Privacy & Security'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: Assets.Icons.verified,
      onPress: () => handleMenuPress('Help & Support'),
    },
    {
      id: 'about',
      title: 'About',
      icon: Assets.Icons.settings,
      onPress: () => handleMenuPress('About'),
    },
  ];

  return (
    <ImageBackground 
      source={Assets.Images.background2} 
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={Icons.back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Assets.Icons.menu} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Image */}
          <View style={styles.avatarContainer}>
            <Avatar
              source={getAvatarSource(userProfile?.avatar || 'pete', userProfile?.avatarType || 'asset')}
              size="3xl"
              variant="circle"
              style={styles.avatar}
            />
          </View>

          {/* Username */}
          <Text style={styles.username}>{userProfile?.username || 'demo'}</Text>
          <Text style={styles.userHandle}>{userProfile?.handle || '@demo'}</Text>

          {/* Edit Profile Button */}
          <View style={styles.editButtonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Image source={item.icon} style={styles.menuItemIcon} />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Image source={Assets.Icons.back} style={[styles.chevronIcon, { transform: [{ rotate: '180deg' }] }]} />
            </TouchableOpacity>
          ))}

          {/* Sign Out Button */}
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, // Increased to account for status bar
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  username: {
    fontSize: 32,
    fontWeight: '300',
    color: 'white',
    marginBottom: 5,
  },
  userHandle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 30,
  },
  editButtonContainer: {
    marginBottom: 40,
  },
  editButton: {
    borderWidth: 2,
    borderColor: '#5771FE',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '300',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  lastMenuItem: {
    marginBottom: 24,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: 'rgba(255, 255, 255, 0.7)',
  },
  signOutButton: {
    backgroundColor: '#FF4757',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});
