import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images } from '../../constants';
import { useAppDispatch } from '../../store';
import { completeOnboarding } from '../../store';
import { Container, Button } from '../../components';

export const WelcomeClaimScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleClaim = () => {
    // Navigate to claim reveal screen
    navigation.navigate('ClaimReveal' as never);
  };

  return (
    <Container variant="image" backgroundImage={Images.onboardingBackground} safeArea>
      <View style={styles.content}>
        {/* Status Bar Time */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>12:38</Text>
        </View>

        {/* Claim Section */}
        <View style={styles.claimSection}>
          <Text style={styles.claimTitle}>Claim</Text>
          
          {/* Logo/Icon Container */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Text style={styles.logo}>🎯</Text>
            </View>
          </View>
        </View>

        {/* Bottom Action */}
        <View style={styles.bottomContainer}>
          <Button
            title="Continue"
            onPress={handleClaim}
            variant="primary"
            size="lg"
            fullWidth
            gradient={true}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  statusBar: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 40,
  },
  statusTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  claimSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 60,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logo: {
    fontSize: 48,
  },
  bottomContainer: {
    paddingBottom: 40,
  },
}); 