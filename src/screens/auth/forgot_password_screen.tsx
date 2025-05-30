import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Layout, Images, Icons } from '../../constants';

const { width, height } = Dimensions.get('window');

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // TODO: Implement reset password logic
    console.log('Reset password pressed');
  };

  return (
    <ImageBackground 
      source={Images.welcomeBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header with logo */}
        <View style={styles.header}>
          <Image 
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Reset Password</Text>
        </View>
        
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.description}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
          
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TouchableOpacity 
              style={styles.sendResetButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.sendResetButtonText}>Send Reset Link</Text>
            </TouchableOpacity>
            
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Go Back button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.goBackButton}
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
    marginBottom: 80,
  },
  logo: {
    width: 39,
    height: 39,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Rubik',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 24,
    fontFamily: 'Rubik',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 40,
    color: '#fff',
    fontSize: 16,
    width: '100%',
    fontFamily: 'Rubik',
  },
  sendResetButton: {
    backgroundColor: '#5771FE',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendResetButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Rubik',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Rubik',
  },
  signInLink: {
    fontSize: 16,
    color: '#5771FE',
    fontWeight: '600',
    fontFamily: 'Rubik',
  },
  footer: {
    alignItems: 'center',
  },
  goBackButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.8)',
  },
}); 