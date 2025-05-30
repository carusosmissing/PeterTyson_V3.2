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
} from 'react-native';
import { Colors, Typography, Spacing, Images } from '../constants';

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
}

interface TrustubCarouselProps {
  trustubs: TrustubData[];
}

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
      
      // Handle infinite scroll jumps
      if (index < trustubs.length) {
        // If we're in the first set, jump to the second set
        const newPosition = (index + trustubs.length) * itemWidth - containerPadding;
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ x: newPosition, animated: false });
          setActiveIndex(index + trustubs.length);
        }, 50);
      } else if (index >= trustubs.length * 2) {
        // If we're in the third set, jump to the second set
        const newPosition = (index - trustubs.length) * itemWidth - containerPadding;
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ x: newPosition, animated: false });
          setActiveIndex(index - trustubs.length);
        }, 50);
      }
    }
  };

  // Initialize scroll position to start at the middle set (second copy)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        const containerPadding = (screenWidth - CARD_WIDTH) / 2 - 30;
        const itemWidth = CARD_WIDTH + CARD_SPACING;
        // Start at the first item of the middle set
        const centerPosition = trustubs.length * itemWidth - containerPadding + 20;
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
          <View key={`${trustub.id}-${index}`} style={styles.cardContainer}>
            <View style={styles.card}>
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
                <View style={styles.artistSection}>
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
            </View>
          </View>
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
  card: {
    borderRadius: 20,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
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
    marginTop: 40, // Moved up 20 points (was 60)
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
}); 