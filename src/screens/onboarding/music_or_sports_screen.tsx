import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import { setSelectedCategory } from '../../store';
import { Container, Button } from '../../components';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export const MusicOrSportsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (option: 'music' | 'sports') => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleContinue = () => {
    if (selectedOptions.length === 0) return;
    
    // Store selected categories in Redux
    if (selectedOptions.includes('music') && selectedOptions.includes('sports')) {
      dispatch(setSelectedCategory('both'));
      navigation.navigate('MusicVibe' as never);
    } else if (selectedOptions.includes('music')) {
      dispatch(setSelectedCategory('music'));
      navigation.navigate('MusicVibe' as never);
    } else if (selectedOptions.includes('sports')) {
      dispatch(setSelectedCategory('sports'));
      navigation.navigate('SportsBig3' as never);
    }
  };

  const renderOptionCard = (type: 'music' | 'sports', label: string) => {
    const isSelected = selectedOptions.includes(type);
    
    return (
      <TouchableOpacity
        style={[
          styles.optionCard,
          isSelected && styles.optionCardSelected
        ]}
        onPress={() => handleOptionToggle(type)}
        activeOpacity={0.8}
      >
        {type === 'music' ? (
          <MaterialIcons name="music-note" size={32} style={styles.optionIcon} />
        ) : (
          <Ionicons name="basketball" size={32} style={styles.optionIcon} />
        )}
        <Text style={[
          styles.optionLabel,
          isSelected && styles.optionLabelSelected
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container variant="image" backgroundImage={Images.onboardingBackground} safeArea>
      <View style={styles.content}>
        {/* Top Section with Logo and Header */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Image source={Images.logoIcon} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome, Wew!</Text>
            <Text style={styles.subtitle}>We're thrilled you're here.</Text>
            <Text style={styles.description}>
              Let us curate your TruEXP experience...
            </Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <Text style={styles.optionsTitle}>I'm a fan of these experiences:</Text>
          
          <View style={styles.optionsContainer}>
            {renderOptionCard('music', 'Music')}
            {renderOptionCard('sports', 'Sports')}
          </View>
          
          <Text style={styles.selectionCount}>
            {selectedOptions.length} selected
          </Text>
        </View>
      </View>

      {/* Fixed Bottom Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedOptions.length === 0 && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={selectedOptions.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding - 15,
    paddingTop: 60,
    paddingBottom: 120,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 60,
  },
  logoContainer: {
    marginRight: 16,
    marginTop: 3,
  },
  logo: {
    width: 39,
    height: 39,
  },
  header: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'left',
  },
  optionsSection: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  optionCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    backgroundColor: 'rgba(64, 156, 255, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  optionIcon: {
    marginBottom: 12,
    color: '#FFFFFF',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
  },
  selectionCount: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 16,
    marginBottom: 80,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: Spacing.semantic.screenPadding - 15,
    right: Spacing.semantic.screenPadding - 15,
  },
  continueButton: {
    backgroundColor: Colors.button.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 