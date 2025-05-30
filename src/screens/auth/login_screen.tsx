import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Layout, Images, Icons } from '../../constants';
import { useAppDispatch } from '../../store';
import { loginSuccess } from '../../store';

const { width, height } = Dimensions.get('window');

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Simulate successful login
    dispatch(loginSuccess({
      user: { id: '1', name: 'Kevin', email: email || 'kevin@example.com' },
      token: 'demo-token',
      refreshToken: 'demo-refresh-token'
    }));
    
    // Navigate to main app
    navigation.navigate('Main' as never);
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
          <Text style={styles.title}>Sign In</Text>
        </View>
        
        {/* Form content */}
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Image 
                  source={Icons.camera}
                  style={styles.eyeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate('ForgotPassword' as never)}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={handleLogin}
            >
              <Image 
                source={Icons.back}
                style={styles.signInIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
                <Text style={styles.signUpLink}>Sign up</Text>
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
    marginBottom: 50,
  },
  logo: {
    width: 39,
    height: 39,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'Rubik',
  },
  input: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 24,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Rubik',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    paddingRight: 50,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Rubik',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
    height: 24,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: 'rgba(255, 255, 255, 0.6)',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#D7F0FC',
    fontWeight: '500',
    fontFamily: 'Rubik',
  },
  signInButton: {
    backgroundColor: '#D7F0FC',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signInIcon: {
    width: 24,
    height: 24,
    tintColor: '#1A365D',
    transform: [{ rotate: '180deg' }],
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Rubik',
  },
  signUpLink: {
    fontSize: 16,
    color: '#D7F0FC',
    fontWeight: '600',
    fontFamily: 'Rubik',
  },
  footer: {
    alignItems: 'center',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
    width: '100%',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.8)',
  },
}); 