import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  Animated,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import QRCode from 'react-native-qrcode-skia';
import { Colors, Typography, Spacing, Images, EventImages } from '../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9; // Back to 90% width
const CARD_HEIGHT = screenHeight * 0.75; // Set to 75% height
const CARD_SPACING = screenWidth * 0.2; // Back to original spacing

interface TrustubData {
  id: string;
  stubNumber: string;
  year: string;
  artist: string;
  venue: string;
  image: any;
  notes: string;
}

interface TrustubCarouselProps {
  trustubs: TrustubData[];
}

interface FlippableCardProps {
  trustub: TrustubData;
  index: number;
}

const FlippableCard: React.FC<FlippableCardProps> = ({ trustub, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [experienceText, setExperienceText] = useState(trustub.notes);
  const [eventPhotos, setEventPhotos] = useState<Array<any | {uri: string}>>([
    EventImages.gallery1,
    EventImages.gallery2,
  ]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | {uri: string} | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const openImagePicker = () => {
    Alert.alert(
      'Add Photo',
      'Choose how you want to add a photo',
      [
        {
          text: 'Camera',
          onPress: () => handleCameraSelection(),
        },
        {
          text: 'Photo Library',
          onPress: () => handleGallerySelection(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleCameraSelection = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const newPhoto = { uri: result.assets[0].uri };
        setEventPhotos([...eventPhotos, newPhoto]);
        Alert.alert('Success', 'Photo captured and added to your experience!');
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handleGallerySelection = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need photo library permissions!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const newPhoto = { uri: result.assets[0].uri };
        setEventPhotos([...eventPhotos, newPhoto]);
        Alert.alert('Success', 'Photo added to your experience!');
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to select photo');
    }
  };

  const removePhoto = (photoIndex: number) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedPhotos = eventPhotos.filter((_, i) => i !== photoIndex);
            setEventPhotos(updatedPhotos);
          },
        },
      ]
    );
  };

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const closePhotoModal = () => {
    setModalVisible(false);
    setSelectedPhoto(null);
  };

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const getPhotoSource = (photo: any) => {
    if (!photo) return null;
    // If it's an object with uri property (from image picker)
    if (typeof photo === 'object' && photo.uri) {
      return { uri: photo.uri };
    }
    // Otherwise it's a require() asset
    return photo;
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={flipCard} activeOpacity={0.9} style={styles.touchableCard}>
        {/* Front of card */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          {/* Trustub Image - Full Background */}
          <Image source={trustub.image} style={styles.trustubImage} />
          
          {/* Overlay Content */}
          <View style={styles.overlay}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.stubNumber}>{trustub.stubNumber}</Text>
              <Text style={styles.year}>{trustub.year}</Text>
            </View>

            {/* Artist and Venue - Centered */}
            <View style={[
              styles.artistSection,
              (trustub.artist === 'Under the Glow' || trustub.artist === 'Halsey') && { marginTop: 15 }
            ]}>
              <Text style={styles.artistName}>{trustub.artist}</Text>
              <Text style={styles.venueName}>{trustub.venue}</Text>
            </View>

            {/* Bottom section with gradient logo */}
            <View style={styles.bottomSection}>
              {/* Gradient logo positioned in bottom right */}
              <View style={styles.logoContainer}>
                <Image source={Images.logo} style={styles.gradientLogo} />
              </View>
            </View>
          </View>
          
          {/* Bottom left transparent cutout overlay */}
          <View style={styles.bottomLeftCutout} />
        </Animated.View>

        {/* Back of card */}
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle, { pointerEvents: isFlipped ? 'auto' : 'none' }]}>
          <View style={styles.backContent}>
            <View style={styles.backHeader}>
              <Text style={styles.backStubNumber}>{trustub.stubNumber}</Text>
              <Text style={styles.tapToFlip}>Tap to flip</Text>
            </View>
            
            {/* QR Code Section */}
            <View style={styles.qrCodeSection}>
              <QRCode
                value={`https://truexp.app/trustub/${trustub.id}`}
                size={140}
                color="white"
                errorCorrectionLevel="M"
                shapeOptions={{
                  shape: "circle",
                  eyePatternShape: "rounded",
                  gap: 1,
                  eyePatternGap: 0,
                }}
                strokeWidth={0.9}
                pathStyle="fill"
              />
            </View>
            
            {/* Experience Notes Section */}
            <View style={styles.notesSection}>
              <Text style={styles.notesTitle}>My Experience</Text>
              
              {/* Photo Gallery Grid */}
              <View style={styles.photoGallery}>
                <View style={styles.photoGrid}>
                  {eventPhotos.map((photo, photoIndex) => (
                    <TouchableOpacity 
                      key={photoIndex} 
                      style={styles.photoContainer}
                      onPress={() => openPhotoModal(photo)}
                      onLongPress={() => removePhoto(photoIndex)}
                    >
                      <Image 
                        source={getPhotoSource(photo)} 
                        style={styles.eventPhoto} 
                      />
                    </TouchableOpacity>
                  ))}
                  
                  {/* Add Photo Button */}
                  <TouchableOpacity style={styles.addPhotoButton} onPress={openImagePicker}>
                    <Text style={styles.addPhotoText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <TextInput
                style={styles.notesInput}
                value={experienceText}
                onChangeText={setExperienceText}
                placeholder="Share your experience..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
            
            <View style={styles.backDetails}>
              <Text style={styles.backTitle}>Event Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Artist</Text>
                <Text style={styles.detailValue}>{trustub.artist}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Venue</Text>
                <Text style={styles.detailValue}>{trustub.venue}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Year</Text>
                <Text style={styles.detailValue}>{trustub.year}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Stub Number</Text>
                <Text style={styles.detailValue}>{trustub.stubNumber}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>

      {/* Photo Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closePhotoModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalCloseArea} 
            onPress={closePhotoModal}
            activeOpacity={1}
          >
            <View style={styles.modalContent}>
              {selectedPhoto && (
                <Image 
                  source={getPhotoSource(selectedPhoto)} 
                  style={styles.modalPhoto} 
                />
              )}
              <TouchableOpacity style={styles.closeButton} onPress={closePhotoModal}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export const TrustubCarousel: React.FC<TrustubCarouselProps> = ({ trustubs }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(trustubs.length); // Start at first real item
  
  // Create infinite data by duplicating items at beginning and end
  const infiniteData = [...trustubs, ...trustubs, ...trustubs];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const containerPadding = (screenWidth - CARD_WIDTH) / 2 - 30;
    const itemWidth = CARD_WIDTH + CARD_SPACING;
    const index = Math.round((scrollPosition + containerPadding) / itemWidth);
    
    if (index !== activeIndex && index >= 0 && index < infiniteData.length) {
      setActiveIndex(index);
    }
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const containerPadding = (screenWidth - CARD_WIDTH) / 2 - 30;
    const itemWidth = CARD_WIDTH + CARD_SPACING;
    const index = Math.round((scrollPosition + containerPadding) / itemWidth);
    
    if (index >= 0 && index < infiniteData.length) {
      setActiveIndex(index);
      
      // Handle infinite scroll jumps with improved logic
      if (index <= 1) {
        // If we're at the very beginning (first 2 items), jump to the middle set
        const middleIndex = index + trustubs.length;
        const newPosition = middleIndex * itemWidth - containerPadding;
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ x: newPosition, animated: false });
          setActiveIndex(middleIndex);
        }, 100); // Increased timeout for smoother transition
      } else if (index >= infiniteData.length - 2) {
        // If we're at the very end (last 2 items), jump to the middle set
        const middleIndex = index - trustubs.length;
        const newPosition = middleIndex * itemWidth - containerPadding;
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ x: newPosition, animated: false });
          setActiveIndex(middleIndex);
        }, 100); // Increased timeout for smoother transition
      }
    }
  };

  // Initialize scroll position to start at the middle set (second copy)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        const containerPadding = (screenWidth - CARD_WIDTH) / 2 - 30;
        const itemWidth = CARD_WIDTH + CARD_SPACING;
        // Start at the first item of the middle set, properly centered
        const centerPosition = trustubs.length * itemWidth - containerPadding + 10;
        scrollViewRef.current.scrollTo({ x: centerPosition, animated: false });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [trustubs.length]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        pagingEnabled={false}
        bounces={false}
      >
        {infiniteData.map((trustub, index) => (
          <FlippableCard 
            key={`${trustub.id}-${index}`} 
            trustub={trustub} 
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90, // Increased bottom margin to create space between nav and carousel
  },
  scrollContainer: {
    paddingLeft: (screenWidth - CARD_WIDTH) / 2 - 30, // Back to original
    paddingRight: (screenWidth - CARD_WIDTH) / 2, // Keep right padding
    paddingTop: 20, // Back to original top padding
    paddingBottom: 10, // Back to original bottom padding
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_SPACING / 2,
  },
  touchableCard: {
    width: '100%',
    height: CARD_HEIGHT,
  },
  card: {
    borderRadius: 20,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    backfaceVisibility: 'hidden',
    // Ensure all corners are properly rounded
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // Add shadow effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15, // For Android
  },
  cardBack: {
    backgroundColor: '#1a1a1a',
  },
  trustubImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 20, // Match card border radius
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'transparent', // Make overlay completely transparent
    borderRadius: 20, // Match card border radius
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stubNumber: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.primary,
  },
  year: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.primary,
  },
  artistSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginTop: 40, // Reverted back to original position for other cards
  },
  artistName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Typography.fontFamily.display,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Typography.fontFamily.secondary,
  },
  bottomSection: {
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: -10, // Lower the logo more
    paddingRight: 0,
  },
  logoContainer: {
    // Removed background bubble and shadow
  },
  gradientLogo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  bottomLeftCutout: {
    // Hidden - no styling to make triangle invisible
  },
  // Back of card styles
  backContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  backHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backStubNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.primary,
  },
  tapToFlip: {
    fontSize: 12,
    color: '#888',
    fontFamily: Typography.fontFamily.secondary,
  },
  qrCodeSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  notesSection: {
    marginBottom: 12,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.secondary,
  },
  photoGallery: {
    marginBottom: 8,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 6,
  },
  photoContainer: {
    width: '22%', // 4 per row with gaps
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  addPhotoButton: {
    width: '22%', // 4 per row with gaps
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  notesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Typography.fontFamily.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minHeight: 80,
    maxHeight: 100,
  },
  backDetails: {
    flex: 1,
    marginTop: 12,
  },
  backTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.display,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailLabel: {
    fontSize: 13,
    color: '#AAA',
    fontFamily: Typography.fontFamily.secondary,
  },
  detailValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.primary,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '80%',
  },
  modalPhoto: {
    width: 300,
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 