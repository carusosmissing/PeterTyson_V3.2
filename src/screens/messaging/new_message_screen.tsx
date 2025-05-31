import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars } from '../../constants';
import { Container } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const NewMessageScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);
  const [searchText, setSearchText] = useState('');
  const [messageText, setMessageText] = useState('Hello!');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const handleSendPress = () => {
    if (messageText.trim()) {
      // Handle send message logic here
      console.log('Sending message:', messageText);
      // Could navigate to a DM screen or show success message
    }
  };

  return (
    <Container variant="image" backgroundImage={Images.welcomeBackground} safeArea>
      <View style={styles.container}>
        {/* Header - copied from inbox */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={Images.logo} style={styles.logoImage} />
            <TouchableOpacity>
              <Image source={Icons.menu} style={styles.menuIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>New Message</Text>
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

        {/* Search Bar with Back Button */}
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButtonContainer}>
              <Image source={Icons.back} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.searchBar}>
              <Image source={Icons.search} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a new contact to message"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={searchText}
                onChangeText={setSearchText}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                  <Image source={Icons.close} style={styles.clearIcon} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Main Content Area - Empty space for now */}
        <View style={styles.contentArea}>
          {/* This area would typically show search results or contacts */}
        </View>

        {/* Message Input Area at Bottom */}
        <View style={styles.messageInputContainer}>
          <View style={styles.messageInputBar}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 57,
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginLeft: -20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.secondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginRight: -15,
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
    fontFamily: Typography.fontFamily.secondary,
  },
  searchContainer: {
    paddingHorizontal: 0,
    paddingBottom: 20,
    marginRight: -15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButtonContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -25,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.6)',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: Typography.fontFamily.primary,
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: 'rgba(255, 255, 255, 0.6)',
  },
  contentArea: {
    flex: 1,
  },
  messageInputContainer: {
    paddingBottom: 100,
  },
  messageInputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    maxHeight: 100,
    paddingRight: 8,
    paddingVertical: 2,
    fontFamily: Typography.fontFamily.primary,
  },
  sendButton: {
    backgroundColor: '#5771FE',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Typography.fontFamily.secondary,
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
}); 