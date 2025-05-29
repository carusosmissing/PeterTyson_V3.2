import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Spacing, Images, Assets, Icons } from '../../constants';
import { Container } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store';
import { logout } from '../../store';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleGoBack = () => {
    navigation.goBack();
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

  const renderMenuItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.menuItemIcon} />
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Image source={Assets.Icons.back} style={[styles.chevronIcon, { transform: [{ rotate: '180deg' }] }]} />
    </TouchableOpacity>
  );

  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Image source={Icons.back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Menu Items List */}
        <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
          {menuItems.map(renderMenuItem)}
          
          {/* Sign Out Button */}
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 57,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 40,
    height: 40,
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(87, 113, 254, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemIcon: {
    width: 18,
    height: 18,
    tintColor: '#5771FE',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: 'rgba(255, 255, 255, 0.7)',
  },
  signOutButton: {
    backgroundColor: '#091343',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 