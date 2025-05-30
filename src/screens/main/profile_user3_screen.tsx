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
import { getAvatarSource } from '../../utils/avatar_utils';

export const ProfileUser3Screen: React.FC = () => {
  const navigation = useNavigation();

  // Dummy profile data for user3
  const userProfile = {
    username: 'Emily Garcia',
    handle: '@emily_champion',
    avatar: 'user3',
    avatarType: 'asset' as 'asset' | 'custom',
    bio: "First place finisher 🏆 Competitive spirit meets music passion. Training hard and partying harder! Let's chase those wins together! 💪",
    genres: ['Hip Hop', 'Trap', 'R&B'],
    sports: ['Basketball', 'CrossFit', 'Track & Field'],
    backgroundColor: '#7DD3B9',
    backgroundType: 'color',
    backgroundImage: null,
  };

  // Function to get background source for images
  const getBackgroundImageSource = (backgroundKey: string) => {
    switch (backgroundKey) {
      case 'background1':
        return Assets.Images.background1;
      case 'background2':
        return Assets.Images.background2;
      case 'background3':
        return Assets.Images.background3;
      default:
        return null;
    }
  };

  const galleryItems = [
    {
      id: '#04331',
      artist: 'Drake',
      image: Trustubs.trustub1,
    },
    {
      id: '#04332',
      artist: 'Travis Scott',
      image: Trustubs.trustub2,
    },
    {
      id: '#04333',
      artist: 'Cardi B',
      image: Trustubs.trustub3,
    },
    {
      id: '#04334',
      artist: 'Future',
      subtitle: 'Championship Night',
      image: Trustubs.trustub4,
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuToggle = () => {
    navigation.navigate('Settings' as never);
  };

  // Check if user has selected a background image (when types are updated)
  const backgroundImageKey = userProfile?.backgroundImage || null;
  const backgroundType = userProfile?.backgroundType || 'color';
  const backgroundImageSource = (backgroundType === 'image' && backgroundImageKey) ? getBackgroundImageSource(backgroundImageKey) : null;

  const renderContent = () => (
    <>
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
        {/* Background Bubble Container - Only for core profile info */}
        <View style={styles.backgroundBubble}>
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <Avatar
              source={getAvatarSource(userProfile?.avatar || 'user3', userProfile?.avatarType || 'asset')}
              size="3xl"
              variant="circle"
              style={styles.profilePicture}
            />
          </View>

          {/* Username and Handle centered */}
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{userProfile?.username || 'User 3'}</Text>
            <Text style={styles.userHandle}>{userProfile?.handle || '@user3'}</Text>
          </View>

          {/* Stats inside bubble */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>567</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8,921</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12,456</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>

          {/* Follow and Message buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info Section - Content outside bubble */}
        <View style={styles.profileInfoSection}>
          {/* Second Background Bubble for Bio and Top Sections */}
          <View style={styles.secondaryBubble}>
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
          </View>

          {/* Third Background Bubble for Badges and Stats */}
          <View style={styles.thirdBubble}>
            {/* Badges Section */}
            <View style={styles.badgesSection}>
              <View style={styles.badgesGrid}>
                <Image source={Assets.Badges.builder} style={styles.badgeImage} />
                <Image source={Assets.Badges.streaker} style={styles.badgeImage} />
              </View>
            </View>

            {/* TruSTUBS/Events/Venues Stats */}
            <View style={styles.profileStatsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>TruSTUBS</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>23</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>11</Text>
                <Text style={styles.statLabel}>Venues</Text>
              </View>
            </View>
          </View>

          {/* Gallery Title */}
          <Text style={styles.galleryTitle}>{userProfile?.username || 'Emily'}'s Favorite Stubs</Text>

          {/* Gallery Grid */}
          <View style={styles.galleryGrid}>
            <View style={styles.galleryRow}>
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[0].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[0].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[0].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Assets.Images.logo} style={styles.logoImage} />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryItem}>
                <Image source={galleryItems[1].image} style={styles.galleryImage} />
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryId}>{galleryItems[1].id}</Text>
                  <Text style={styles.galleryArtist}>{galleryItems[1].artist}</Text>
                </View>
                <View style={styles.logoOverlay}>
                  <Image source={Assets.Images.logo} style={styles.logoImage} />
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
                <View style={styles.logoOverlay}>
                  <Image source={Assets.Images.logo} style={styles.logoImage} />
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
                <View style={styles.logoOverlay}>
                  <Image source={Assets.Images.logo} style={styles.logoImage} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );

  return backgroundImageSource ? (
    <ImageBackground 
      source={backgroundImageSource} 
      style={styles.container}
      resizeMode="cover"
    >
      {renderContent()}
    </ImageBackground>
  ) : (
    <View style={[styles.container, { backgroundColor: userProfile?.backgroundColor || '#7DD3B9' }]}>
      {renderContent()}
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
  backgroundBubble: {
    marginHorizontal: 20,
    marginTop: 140,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 20,
  },
  profileInfoSection: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  profilePictureContainer: {
    marginBottom: -10,
    alignItems: 'center',
    marginTop: -110,
  },
  profilePicture: {
    width: 180,
    height: 180,
    marginTop: 5,
  },
  userInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: -25,
    marginBottom: 4,
    fontFamily: 'Rubik',
  },
  userHandle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontFamily: 'Rubik',
  },
  bioSection: {
    marginBottom: 20,
  },
  bioText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
    fontStyle: 'italic',
    fontFamily: 'Rubik',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
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
    fontFamily: 'Rubik',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Rubik',
  },
  badgesSection: {
    marginBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  badgesGrid: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
  },
  badgeImage: {
    width: 66,
    height: 66,
    resizeMode: 'contain',
  },
  genresSection: {
    marginBottom: 20,
  },
  genresSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Rubik',
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
    fontFamily: 'Rubik',
  },
  sportsSection: {
    marginBottom: 0,
  },
  sportsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Rubik',
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
    fontFamily: 'Rubik',
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: -20,
    fontFamily: 'Rubik',
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
    fontFamily: 'Rubik',
  },
  galleryArtist: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Rubik',
  },
  gallerySubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    marginTop: 2,
    fontFamily: 'Rubik',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    gap: 10,
  },
  followButton: {
    backgroundColor: '#5771FE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Rubik',
  },
  messageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  messageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Rubik',
  },
  secondaryBubble: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  profileStatsContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 0,
  },
  thirdBubble: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  logoOverlay: {
    position: 'absolute',
    bottom: 45,
    right: 7,
    zIndex: 10,
  },
  logoImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
}); 