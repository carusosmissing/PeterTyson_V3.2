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
import { Colors, Typography, Layout, Assets, Icons, Trustubs } from '../../constants';
import { Avatar } from '../../components/ui/avatar';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state: any) => state.user.profile);

  const galleryItems = [
    {
      id: '#01230',
      artist: 'Kendrick Lamar',
      image: Trustubs.trustub1,
    },
    {
      id: '#01240',
      artist: 'Lady Gaga',
      image: Trustubs.trustub2,
    },
    {
      id: '#01241',
      artist: 'Fred Again',
      image: Trustubs.trustub3,
    },
    {
      id: '#01236',
      artist: 'TruEXP',
      subtitle: 'Early Adopter',
      image: Trustubs.trustub4,
    },
  ];

  const handleEditProfile = () => {
    navigation.navigate('EditProfile' as never);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuToggle = () => {
    navigation.navigate('Settings' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: userProfile?.backgroundColor || '#000000' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={Icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
          <Image source={Assets.Icons.menu} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          {userProfile?.bannerImage && userProfile?.bannerType === 'custom' ? (
            <ImageBackground 
              source={{ uri: userProfile.bannerImage }} 
              style={styles.banner}
              resizeMode="cover"
            />
          ) : (
            <ImageBackground 
              source={Assets.Images.background3} 
              style={styles.banner}
              resizeMode="cover"
            />
          )}
          
          {/* Profile Picture overlapping banner */}
          <View style={styles.profilePictureContainer}>
            <Avatar
              source={getAvatarSource(userProfile?.avatar || 'pete', userProfile?.avatarType || 'asset')}
              size="3xl"
              variant="circle"
              style={styles.profilePicture}
            />
          </View>
        </View>

        {/* Profile Info Section */}
        <View style={styles.profileInfoSection}>
          <View style={styles.nameAndEditContainer}>
            <Text style={styles.userName}>{userProfile?.username || 'Swickie F'}</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
          
          {/* Join date */}
          <View style={styles.joinDateContainer}>
            <Text style={styles.joinDate}>Jun 2024</Text>
          </View>

          {/* Bio Section */}
          <View style={styles.bioSection}>
            <Text style={styles.bioText}>{userProfile?.bio || 'Add your bio in edit profile to share more about yourself!'}</Text>
          </View>

          {/* Top Genres Section */}
          {userProfile?.genres && userProfile.genres.length > 0 && (
            <View style={styles.genresSection}>
              <Text style={styles.genresSectionTitle}>Top Genres</Text>
              <View style={styles.genresDisplayContainer}>
                {userProfile.genres.map((genre: string, index: number) => (
                  <View key={genre} style={styles.genreDisplayTag}>
                    <Text style={styles.genreDisplayText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Top Sports Section */}
          {userProfile?.sports && userProfile.sports.length > 0 && (
            <View style={styles.sportsSection}>
              <Text style={styles.sportsSectionTitle}>Top Sports</Text>
              <View style={styles.sportsDisplayContainer}>
                {userProfile.sports.map((sport: string, index: number) => (
                  <View key={sport} style={styles.sportDisplayTag}>
                    <Text style={styles.sportDisplayText}>{sport}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Badges Section */}
          <View style={styles.badgesSection}>
            <View style={styles.badgesGrid}>
              <Image source={Assets.Badges.builder} style={styles.badgeImage} />
              <Image source={Assets.Badges.plugged} style={styles.badgeImage} />
              <Image source={Assets.Badges.streaker} style={styles.badgeImage} />
              <Image source={Assets.Badges.fullSend} style={styles.badgeImage} />
              <Image source={Assets.Badges.thinkTank} style={styles.badgeImage} />
            </View>
          </View>

          {/* Stats Card */}
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

          {/* Gallery Title */}
          <Text style={styles.galleryTitle}>{userProfile?.username || 'Demo'}'s Favorite Stubs</Text>

          {/* Gallery Grid */}
          <View style={styles.galleryGrid}>
            <View style={styles.galleryRow}>
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[0].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[0].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[0].artist}</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[1].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[1].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[1].artist}</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.galleryRow, styles.galleryRowSecond]}>
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[2].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[2].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[2].artist}</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[3].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[3].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[3].artist}</Text>
                  {galleryItems[3].subtitle && (
                    <Text style={styles.gallerySubtitle}>{galleryItems[3].subtitle}</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  bannerContainer: {
    height: 200,
    position: 'relative',
  },
  banner: {
    height: 160,
    // Adding a gradient-like effect with shadow
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  profilePictureContainer: {
    position: 'absolute',
    left: -25,
    top: 70,
  },
  profilePicture: {
    width: 180,
    height: 180,
  },
  profileInfoSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  nameAndEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  joinDate: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  bioSection: {
    marginBottom: 30,
  },
  bioText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  badgesSection: {
    marginBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  badgesGrid: {
    flexDirection: 'row',
    gap: 5,
  },
  badgeImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  genresSection: {
    marginBottom: 30,
  },
  genresSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  genresDisplayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreDisplayTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  genreDisplayText: {
    fontSize: 14,
    color: 'white',
  },
  sportsSection: {
    marginBottom: 30,
  },
  sportsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  sportsDisplayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportDisplayTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  sportDisplayText: {
    fontSize: 14,
    color: 'white',
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: -20,
  },
  galleryGrid: {
    marginTop: -5,
    marginBottom: 5,
  },
  galleryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  galleryRowSecond: {
    marginTop: -60,
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
});
