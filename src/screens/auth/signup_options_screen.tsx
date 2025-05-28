import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Layout, Images, Icons } from '../../constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export const SignupOptionsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleAppleSignup = () => {
    // TODO: Implement Apple signup
    console.log('Apple signup pressed');
  };

  const handleFacebookSignup = () => {
    // TODO: Implement Facebook signup
    console.log('Facebook signup pressed');
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google signup
    console.log('Google signup pressed');
  };

  const handleEmailSignup = () => {
    navigation.navigate('SignUp' as never);
  };

  return (
    <ImageBackground 
      source={Images.welcomeBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header with logo and title */}
        <View style={styles.header}>
          <Image 
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Create Account</Text>
        </View>
        
        {/* Social login buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity 
            style={styles.appleButton}
            onPress={handleAppleSignup}
          >
            <AntDesign name="apple1" size={20} color="#fff" style={styles.socialIcon} />
            <Text style={styles.appleButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.facebookButton}
            onPress={handleFacebookSignup}
          >
            <FontAwesome name="facebook" size={20} color="#fff" style={styles.socialIcon} />
            <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleSignup}
          >
            <AntDesign name="google" size={20} color="#fff" style={styles.socialIcon} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* OR divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email signup button */}
        <TouchableOpacity 
          style={styles.emailButton}
          onPress={handleEmailSignup}
        >
          <Text style={styles.emailButtonText}>Sign up with Email</Text>
        </TouchableOpacity>

        {/* Terms of service */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By creating an account, you agree to our</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Terms' as never)}>
            <Text style={styles.termsLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        {/* Footer with back button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={Icons.back}
              style={styles.backIcon}
              resizeMode="contain"
            />
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 39,
    height: 39,
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  socialButtonsContainer: {
    marginBottom: 40,
    gap: 16,
  },
  appleButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
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
  appleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
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
  facebookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
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
  googleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 20,
    fontWeight: '500',
  },
  emailButton: {
    backgroundColor: '#D7F0FC',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emailButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A365D',
  },
  termsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 4,
  },
  termsLink: {
    fontSize: 14,
    color: '#60A5FA',
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.8)',
    marginRight: 8,
  },
  socialIcon: {
    marginRight: 12,
  },
}); 