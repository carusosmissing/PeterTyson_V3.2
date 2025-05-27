import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images } from '../../constants';
import { useAppDispatch } from '../../store';
import { completeOnboarding } from '../../store';
import { Container, Button } from '../../components';

export const WelcomeClaimRevealScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleGetStarted = () => {
    // Mark onboarding as complete
    dispatch(completeOnboarding());
    
    // Navigate to main app
    navigation.navigate('MainApp' as never);
  };

  const handleViewInShrine = () => {
    // Mark onboarding as complete
    dispatch(completeOnboarding());
    
    // Navigate to shrine
    navigation.navigate('Shrine' as never);
  };

  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea>
      <View style={styles.content}>
        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          {/* Ticket Header */}
          <View style={styles.ticketHeader}>
            <Text style={styles.stubNumber}>Stub #01236</Text>
            <Text style={styles.date}>8/10/2025</Text>
          </View>

          {/* Artist and Venue */}
          <View style={styles.artistSection}>
            <Text style={styles.artistName}>SZA</Text>
            <Text style={styles.venueName}>Kaseya Center</Text>
          </View>

          {/* Heart Hands Silhouette */}
          <View style={styles.imageSection}>
            <View style={styles.heartHandsContainer}>
              <Text style={styles.heartHands}>🤲</Text>
            </View>
            
            {/* Bokeh lights effect */}
            <View style={styles.bokehContainer}>
              <View style={[styles.bokehLight, styles.bokeh1]} />
              <View style={[styles.bokehLight, styles.bokeh2]} />
              <View style={[styles.bokehLight, styles.bokeh3]} />
              <View style={[styles.bokehLight, styles.bokeh4]} />
              <View style={[styles.bokehLight, styles.bokeh5]} />
              <View style={[styles.bokehLight, styles.bokeh6]} />
            </View>
          </View>
        </View>

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
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginBottom: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  stubNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  artistSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  artistName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  imageSection: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartHandsContainer: {
    zIndex: 2,
  },
  heartHands: {
    fontSize: 120,
    color: '#000000',
  },
  bokehContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  bokehLight: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.7,
  },
  bokeh1: {
    width: 40,
    height: 40,
    backgroundColor: '#FF6B9D',
    top: '20%',
    left: '15%',
  },
  bokeh2: {
    width: 30,
    height: 30,
    backgroundColor: '#4ECDC4',
    top: '30%',
    right: '20%',
  },
  bokeh3: {
    width: 35,
    height: 35,
    backgroundColor: '#FFE66D',
    bottom: '30%',
    left: '25%',
  },
  bokeh4: {
    width: 25,
    height: 25,
    backgroundColor: '#A8E6CF',
    bottom: '40%',
    right: '15%',
  },
  bokeh5: {
    width: 45,
    height: 45,
    backgroundColor: '#FF8B94',
    top: '50%',
    left: '10%',
  },
  bokeh6: {
    width: 20,
    height: 20,
    backgroundColor: '#B4A7D6',
    bottom: '20%',
    right: '30%',
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