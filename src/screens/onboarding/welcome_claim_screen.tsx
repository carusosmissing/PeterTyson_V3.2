import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Trustubs } from '../../constants';
import { useAppDispatch } from '../../store';
import { completeOnboarding } from '../../store';
import { Container, Button } from '../../components';

export const WelcomeClaimScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pumpAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pumpAnimation.start();

    return () => pumpAnimation.stop();
  }, [scaleAnim]);

  const handleClaim = () => {
    // Navigate to claim reveal screen
    navigation.navigate('ClaimReveal' as never);
  };

  return (
    <Container variant="image" backgroundImage={Images.background1} safeArea>
      <View style={styles.content}>
        {/* Claim Section */}
        <View style={styles.claimSection}>
          {/* Title Text */}
          <Text style={styles.claimTitle}>Oh shittt...it's time to claim your first stub.</Text>
          
          {/* Logo/Icon Container */}
          <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity style={styles.coverButton} onPress={handleClaim}>
              <Image source={Trustubs.claimPrerevealCover1} style={styles.trustubCover} resizeMode="contain" />
              {/* Stacked Logos */}
              <View style={styles.logoStack}>
                <Image source={Images.logoWhite} style={styles.logoWhite} resizeMode="contain" />
                <Image source={Images.logo} style={styles.logoGradient} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </Animated.View>
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
  claimSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  claimTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 120,
    marginBottom: 20,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  coverButton: {
    width: '90%',
    height: '80%',
    maxWidth: 350,
    maxHeight: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustubCover: {
    width: '100%',
    height: '100%',
  },
  logoStack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWhite: {
    width: 90,
    height: 90,
    position: 'absolute',
    zIndex: 2,
  },
  logoGradient: {
    width: 90,
    height: 90,
    position: 'absolute',
    zIndex: 1,
    marginTop: 15,
  },
}); 