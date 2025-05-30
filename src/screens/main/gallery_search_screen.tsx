import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars, EventImages } from '../../constants';
import { Container } from '../../components';
import { useAppSelector } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

const { width } = Dimensions.get('window');

export const GallerySearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const userProfile = useAppSelector((state: any) => state.user.profile);
  const [searchText, setSearchText] = useState('');

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const handleMenuToggle = () => {
    navigation.navigate('Settings' as never);
  };

  // Sample gallery data - using the available gallery images
  const galleryItems = [
    {
      id: 1,
      image: EventImages.gallery1,
      sharedBy: '@hannah.bobana',
      timeAgo: '48 min',
      type: 'shared'
    },
    {
      id: 2,
      image: EventImages.gallery2,
      sharedBy: '@john.doe',
      timeAgo: '2h',
      type: 'event'
    }
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
          <Text style={styles.headerTitle}>Gallery</Text>
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

        {/* Gallery Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {galleryItems.map((item) => (
            <View key={item.id} style={styles.galleryItem}>
              {/* Gallery Image - Edge to Edge */}
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.galleryImage} />
              </View>
              
              {/* Post Info Section */}
              <View style={styles.postInfo}>
                <TouchableOpacity style={styles.postInfoRow}>
                  <Image source={Icons.like} style={styles.postIcon} />
                  <Text style={styles.postText}>Shared by {item.sharedBy}</Text>
                  <Text style={styles.timeText}>{item.timeAgo}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.postInfoRow}>
                  <Image source={Icons.share} style={styles.postIcon} />
                  <Text style={styles.postText}>Send It</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.postInfoRow}>
                  <Image source={Icons.camera} style={styles.postIcon} />
                  <Text style={styles.postText}>View Stub</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  galleryItem: {
    marginBottom: 10,
  },
  imageContainer: {
    width: width, // Full screen width
    height: 400,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postInfo: {
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingVertical: 5,
    marginTop: 4,
  },
  postInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  postIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 12,
  },
  postText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
    marginLeft: 'auto',
  },
  searchContainer: {
    paddingHorizontal: Spacing.semantic.screenPadding,
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
}); 