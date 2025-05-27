import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Layout } from '../../constants';

export const TermsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleAccept = () => {
    // TODO: Implement terms acceptance logic
    console.log('Terms accepted');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Terms of Service</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing and using TruEXP, you accept and agree to be bound by the terms and provision of this agreement.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Use License</Text>
        <Text style={styles.text}>
          Permission is granted to temporarily download one copy of TruEXP per device for personal, non-commercial transitory viewing only.
        </Text>
        
        <Text style={styles.sectionTitle}>3. Disclaimer</Text>
        <Text style={styles.text}>
          The materials on TruEXP are provided on an 'as is' basis. TruEXP makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </Text>
        
        <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
        <Text style={styles.text}>
          Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
        </Text>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleAccept}
        >
          <Text style={styles.primaryButtonText}>Accept Terms</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.linkText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Layout.screenPaddingHorizontal,
    paddingBottom: 20,
  },
  title: {
    ...Typography.textStyles.h2,
    color: Colors.text,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.screenPaddingHorizontal,
  },
  sectionTitle: {
    ...Typography.textStyles.h4,
    color: Colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    ...Typography.textStyles.body,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    paddingHorizontal: Layout.screenPaddingHorizontal,
    paddingBottom: 40,
    paddingTop: 20,
  },
  primaryButton: {
    backgroundColor: Colors.buttonPrimary,
    height: Layout.buttonHeight,
    borderRadius: Layout.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    ...Typography.textStyles.button,
    color: Colors.text,
  },
  linkText: {
    ...Typography.textStyles.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
}); 