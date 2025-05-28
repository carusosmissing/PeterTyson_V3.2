import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import { addAnswer, nextStep } from '../../store';
import { Container, Button } from '../../components';

export const SportsFanFuelScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state: any) => state.onboarding);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [
    'Sports',
    'Atmosphere',
    'Friends',
    'FOMO'
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (!selectedOption) return;
    
    // Save answer to Redux
    dispatch(addAnswer({
      questionId: 'sports_fan_fuel',
      selectedOptions: [selectedOption]
    }));
    
    // Navigate to claim screen (final screen)
    navigation.navigate('WelcomeClaimScreen' as never);
  };

  const renderOption = (option: string) => {
    const isSelected = selectedOption === option;
    
    return (
      <TouchableOpacity
        key={option}
        style={[
          styles.optionButton,
          isSelected && styles.optionButtonSelected
        ]}
        onPress={() => handleOptionSelect(option)}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.optionText,
          isSelected && styles.optionTextSelected
        ]}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container variant="image" backgroundImage={Images.onboardingBackground} safeArea>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={Images.logoIcon} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Your fan fuel?</Text>
        </View>

        <Text style={styles.subtitle}>
          Your main reason for attending sporting events:
        </Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map(renderOption)}
        </View>
      </View>

      {/* Fixed Bottom Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedOption && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
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
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginLeft: -20,
  },
  logo: {
    width: 39,
    height: 39,
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 40,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  optionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(64, 156, 255, 0.8)',
    borderColor: 'rgba(64, 156, 255, 1)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: Spacing.semantic.screenPadding,
    right: Spacing.semantic.screenPadding,
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