import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars } from '../../constants';
import { Container } from '../../components';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const profileImages = [
    'https://via.placeholder.com/60x60/FFFFFF/000000?text=🐕',
    'https://via.placeholder.com/60x60/FFFFFF/000000?text=👨',
    'https://via.placeholder.com/60x60/FFFFFF/000000?text=👩',
    'https://via.placeholder.com/60x60/FFFFFF/000000?text=🧔',
    'https://via.placeholder.com/60x60/FFFFFF/000000?text=👦',
  ];

  const galleryItems = [
    {
      id: '#01230',
      artist: 'Kendrick Lamar',
      image: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Kendrick',
    },
    {
      id: '#01240',
      artist: 'Lady Gaga',
      image: 'https://via.placeholder.com/300x400/9B59B6/FFFFFF?text=Gaga',
    },
    {
      id: '#01241',
      artist: 'Fred Again',
      image: 'https://via.placeholder.com/300x400/8E44AD/FFFFFF?text=Fred',
    },
    {
      id: '#01236',
      artist: 'Welcome to the Pit',
      image: 'https://via.placeholder.com/300x400/3498DB/FFFFFF?text=Pit',
    },
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
          <Text style={styles.headerTitle}>Homepage</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
              <Image 
                source={Avatars.pete}
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

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome, Kevin!</Text>
          <Text style={styles.streakText}>You're on a 2 day streak!</Text>
        </View>

        {/* Sent Count */}
        <Text style={styles.sentCount}>1667 Sent</Text>

        {/* Profile Row */}
        <View style={styles.profileRow}>
          {profileImages.map((image, index) => (
            <TouchableOpacity key={index} style={styles.profileCircle}>
              <Image source={{ uri: image }} style={styles.profileCircleImage} />
            </TouchableOpacity>
          ))}
        </View>

        {/* View Challenges Button */}
        <TouchableOpacity style={styles.challengesButton}>
          <Text style={styles.challengesButtonText}>View Challenges In The Pit</Text>
        </TouchableOpacity>

        {/* The Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={styles.galleryTitle}>The Gallery</Text>
          
          <View style={styles.galleryGrid}>
            <View style={styles.galleryRow}>
              <TouchableOpacity style={[styles.galleryItem, styles.galleryItemLarge]}>
                <Image source={{ uri: galleryItems[0].image }} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[0].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[0].artist}</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.galleryItem, styles.galleryItemLarge]}>
                <Image source={{ uri: galleryItems[1].image }} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[1].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[1].artist}</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.galleryRow}>
              <TouchableOpacity style={[styles.galleryItem, styles.galleryItemSmall]}>
                <Image source={{ uri: galleryItems[2].image }} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[2].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[2].artist}</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.galleryItem, styles.galleryItemSmall]}>
                <Image source={{ uri: galleryItems[3].image }} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[3].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[3].artist}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    tintColor: Colors.text.inverse,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginRight: -10,
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
    width: 24,
    height: 24,
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
    color: Colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  streakText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  sentCount: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  profileCircleImage: {
    width: '100%',
    height: '100%',
  },
  challengesButton: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  challengesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  gallerySection: {
    marginBottom: 40,
  },
  galleryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  galleryGrid: {
    gap: 15,
  },
  galleryRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  galleryItem: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryItemLarge: {
    flex: 1,
    height: 250,
  },
  galleryItemSmall: {
    flex: 1,
    height: 120,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  galleryOverlay: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  galleryId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  galleryArtist: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
