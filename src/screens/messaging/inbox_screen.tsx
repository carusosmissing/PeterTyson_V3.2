import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars } from '../../constants';
import { Container } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

// Sample message data to match the screenshot
const messageData = [
  {
    id: '1',
    userId: 'jiara_martins',
    name: 'Jiara Martins',
    message: "Visit the VIP Exclusive's Lounge.",
    time: '02:11 pm',
    unreadCount: 1,
    avatar: Avatars.user1,
  },
  {
    id: '2',
    userId: 'lila_jane',
    name: 'Lila Jane',
    message: 'Great to meet you at the show!',
    time: '12:12 pm',
    unreadCount: 0,
    avatar: Avatars.user2,
  },
  {
    id: '3',
    userId: 'emily_garcia',
    name: 'Emily Garcia',
    message: "You're first place?! 🏆",
    time: '10:03 am',
    unreadCount: 3,
    avatar: Avatars.user3,
  },
];

export const InboxScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);
  const [searchText, setSearchText] = useState('');

  // Profile images array from home screen
  const profileImages = [
    Avatars.user1,
    Avatars.user2,
    Avatars.user3,
    Avatars.user4,
    Avatars.user5,
  ];

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const handleMenuToggle = () => {
    navigation.navigate('Settings' as never);
  };

  const handleNewMessagePress = () => {
    navigation.navigate('NewMessage' as never);
  };

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

  const handleMessagePress = (messageId: string, userId: string) => {
    // Navigate to specific DM screens based on user
    if (userId === 'emily_garcia') {
      navigation.navigate('DMEmily' as never);
    } else if (userId === 'jiara_martins') {
      navigation.navigate('DMJiara' as never);
    } else if (userId === 'lila_jane') {
      navigation.navigate('DMLila' as never);
    } else {
      // For other users, we could navigate to a generic DM screen or show a placeholder
      console.log('Message pressed:', messageId, 'User:', userId);
    }
  };

  const handleMessageProfilePress = (userId: string) => {
    // Navigate to specific profile screens based on user
    if (userId === 'emily_garcia') {
      navigation.navigate('ProfileUser3' as never);
    } else if (userId === 'jiara_martins') {
      navigation.navigate('ProfileUser1' as never);
    } else if (userId === 'lila_jane') {
      navigation.navigate('ProfileUser2' as never);
    } else {
      console.log('Profile pressed for unknown user:', userId);
    }
  };

  const renderMessageItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.messageItem} 
      onPress={() => handleMessagePress(item.id, item.userId)}
    >
      <TouchableOpacity onPress={() => handleMessageProfilePress(item.userId)}>
        <Image source={item.avatar} style={styles.messageAvatar} />
      </TouchableOpacity>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={Images.logo} style={styles.logoImage} />
            <TouchableOpacity onPress={handleMenuToggle}>
              <Image source={Icons.menu} style={styles.menuIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Inbox</Text>
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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Image source={Icons.search} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
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

        {/* Messages List */}
        <View style={styles.messagesContainer}>
          <FlatList
            data={messageData}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesList}
          />
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={handleNewMessagePress}>
          <Image source={Icons.plusBlack} style={styles.fabIcon} />
        </TouchableOpacity>
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
    paddingHorizontal: 0,
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
  searchContainer: {
    paddingHorizontal: 0,
    paddingBottom: 15,
  },
  searchBar: {
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
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: 'rgba(255, 255, 255, 0.6)',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  messagesList: {
    paddingBottom: 100,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  messageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  messageText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    lineHeight: 20,
  },
  unreadBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FF4757',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D7F0FC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    width: 28,
    height: 28,
  },
  profileRowContainer: {
    paddingHorizontal: 0,
    paddingBottom: 15,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    overflow: 'hidden',
  },
  profileCircleImage: {
    width: '100%',
    height: '100%',
  },
});
