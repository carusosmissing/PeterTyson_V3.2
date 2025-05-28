import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Trustubs } from '../../constants';
import { useAppDispatch } from '../../store';
import { completeOnboarding } from '../../store';
import { Container, Button } from '../../components';

export const WelcomeClaimRevealScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleGetStarted = () => {
    // Mark onboarding as complete
    dispatch(completeOnboarding());
    
    // Navigate to main app (home screen)
    navigation.navigate('Main' as never);
  };

  const handleViewInShrine = () => {
    // Mark onboarding as complete
    dispatch(completeOnboarding());
    
    // Navigate directly to the shrine tab
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main' as never,
          state: {
            routes: [
              { name: 'Home' },
              { name: 'Messaging' },
              { name: 'TheShrine' },
              { name: 'ThePit' },
              { name: 'Search' },
            ],
            index: 2, // TheShrine is at index 2
          },
        },
      ],
    });
  };

  return (
    <Container variant="image" backgroundImage={Images.background1} safeArea>
      <View style={styles.content}>
        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          {/* Trustub Image - Full Background */}
          <Image source={Trustubs.trustub4} style={styles.trustubImage} />
          
          {/* Overlay Content */}
          <View style={styles.overlay}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.stubNumber}>Stub #01241</Text>
              <Text style={styles.year}>2024</Text>
            </View>

            {/* Artist and Venue - Centered */}
            <View style={styles.artistSection}>
              <Text style={styles.artistName}>TruEXP</Text>
              <Text style={styles.venueName}>Early Adopter</Text>
            </View>

            {/* Bottom section with gradient logo */}
            <View style={styles.bottomSection}>
              <View style={styles.logoContainer}>
                <Image source={Images.logo} style={styles.gradientLogo} />
              </View>
            </View>
          </View>
        </View>

        {/* Spacer to push buttons to bottom */}
        <View style={{ flex: 1 }} />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shrineButton} onPress={handleViewInShrine}>
              <Text style={styles.shrineText}>View in Shrine</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingTop: 40,
    paddingBottom: 40,
  },
  ticketCard: {
    height: '75%',
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 60,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
  },
  trustubImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderRadius: 20,
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
  },
  year: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFFFFF',
  },
  artistSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginTop: 40,
  },
  artistName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottomSection: {
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: -10,
    paddingRight: 0,
  },
  logoContainer: {
    // Removed background styling to match shrine
  },
  gradientLogo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  getStartedButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shrineButton: {
    flex: 1,
    backgroundColor: 'rgba(100, 200, 255, 0.8)',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  shrineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 