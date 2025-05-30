import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Layout, Images, Icons } from '../../constants';

const { width, height } = Dimensions.get('window');

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    // TODO: Implement sign up validation
    console.log('Sign up pressed');
    // Navigate to terms screen
    navigation.navigate('Terms' as never);
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
          <Text style={styles.title}>Create Account</Text>
        </View>
        
        {/* Form content */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={fullName}
              onChangeText={setFullName}
            />
            
            <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Text style={styles.label}>Username <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            
            <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a password"
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
            
            <Text style={styles.label}>Confirm Password <Text style={styles.required}>*</Text></Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm your password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Image 
                  source={Icons.camera}
                  style={styles.eyeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.label}>Phone Number <Text style={styles.optional}>(Optional)</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </ScrollView>
        
        {/* Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.goBackButtonText}>Go Back</Text>
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
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 39,
    height: 39,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Rubik',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  required: {
    color: '#FF6B6B',
    fontFamily: 'Rubik',
  },
  optional: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
    fontFamily: 'Rubik',
  },
  input: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Rubik',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
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
  footer: {
    gap: 16,
  },
  signUpButton: {
    backgroundColor: '#5771FE',
    borderRadius: 12,
    height: 56,
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
  signUpButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Rubik',
  },
  goBackButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Rubik',
  },
}); 