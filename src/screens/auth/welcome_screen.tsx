import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images } from '../../constants';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('SignupOptions' as never);
  };

  const handleSignIn = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <ImageBackground 
      source={Images.welcomeBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image 
            source={Images.fullLogotypeGradient}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Button Section */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={handleSignIn}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingBottom: 40,
    paddingTop: 60,
  },
  logoSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 120,
  },
  logoImage: {
    width: 330,
    height: 80,
  },
  buttonSection: {
    gap: 16,
  },
  getStartedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  signInButton: {
    backgroundColor: 'transparent',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
}); 