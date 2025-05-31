import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Spacing, Images, Icons } from '../../constants';
import { Container } from '../../components';
import { useNavigation } from '@react-navigation/native';

export const NotiScreen: React.FC = () => {
  const navigation = useNavigation();

  const notifications = [
    {
      id: '1',
      title: 'New Challenge Available',
      message: 'Check out the latest challenge in The Pit!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Friend Request',
      message: 'John Doe wants to connect with you',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      title: 'Event Reminder',
      message: 'Concert starts in 1 hour',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      title: 'New Gallery Item',
      message: 'Someone added a new item to The Gallery',
      time: '2 days ago',
      read: true,
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderNotification = (notification: any) => (
    <TouchableOpacity key={notification.id} style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        {!notification.read && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <Container variant="image" backgroundImage={Images.welcomeBackground} safeArea>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Image source={Icons.back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Notifications List */}
        <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
          {notifications.map(renderNotification)}
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
    fontFamily: Typography.fontFamily.secondary,
  },
  headerRight: {
    width: 40,
    height: 40,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationContent: {
    position: 'relative',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
    fontFamily: Typography.fontFamily.secondary,
  },
  notificationTime: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    fontFamily: Typography.fontFamily.primary,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
    fontFamily: Typography.fontFamily.primary,
  },
  unreadDot: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryLight,
  },
}); 