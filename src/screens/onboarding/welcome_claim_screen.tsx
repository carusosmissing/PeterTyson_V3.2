import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Trustubs } from '../../constants';
import { useAppDispatch } from '../../store';
import { completeOnboarding } from '../../store';
import { Container, Button } from '../../components';

export const WelcomeClaimScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(1)).current;
  const [isAnimating, setIsAnimating] = useState(false);

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
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Stop the pulsing animation
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
    
    // Create spinning and expanding animation
    const spinAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    
    const expandAnimation = Animated.timing(expandAnim, {
      toValue: 15, // Scale to 15x to fill screen
      duration: 2000,
      useNativeDriver: true,
    });
    
    // Start spinning
    spinAnimation.start();
    
    // Start expanding after a brief delay
    setTimeout(() => {
      expandAnimation.start(({ finished }) => {
        if (finished) {
          // Navigate to next screen
          navigation.navigate('ClaimReveal' as never);
        }
      });
    }, 500);
  };

  return (
    <Container variant="image" backgroundImage={Images.onboardingBackground} safeArea>
      <View style={styles.content}>
        {/* Claim Section */}
        <View style={styles.claimSection}>
          {/* Title Text */}
          <Text style={styles.claimTitle}>Oh shit Pete...It's time to claim your first stub.</Text>
          
          {/* Logo/Icon Container */}
          <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity style={styles.coverButton} onPress={handleClaim} disabled={isAnimating}>
              <Animated.View style={[
                styles.animatedWrapper,
                { 
                  transform: [
                    { 
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                      })
                    },
                    { scale: expandAnim }
                  ]
                }
              ]}>
                <Image source={Trustubs.claimPrerevealCover1} style={styles.trustubCover} resizeMode="contain" />
                {/* Stacked Logos */}
                <View style={styles.logoStack}>
                  <Image source={Images.logoWhite} style={styles.logoWhite} resizeMode="contain" />
                  <Image source={Images.logo} style={styles.logoGradient} resizeMode="contain" />
                </View>
              </Animated.View>
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
    marginTop: 100,
    marginBottom: 0,
    textAlign: 'center',
    fontFamily: 'Rubik',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  coverButton: {
    width: '100%',
    height: '90%',
    maxWidth: 368,
    maxHeight: 525,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  animatedWrapper: {
    width: '100%',
    height: '100%',
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