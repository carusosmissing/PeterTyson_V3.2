import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import { addAnswer, nextStep } from '../../store';
import { Container, Button } from '../../components';

export const SportsBig3Screen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state: any) => state.onboarding);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    'Football',
    'Basketball',
    'Baseball',
    'Soccer',
    'Hockey'
  ];

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else if (prev.length < 3) {
        return [...prev, option];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    if (selectedOptions.length === 0) return;
    
    // Save answer to Redux
    dispatch(addAnswer({
      questionId: 'sports_big_3',
      selectedOptions: selectedOptions
    }));
    
    // Navigate to next screen
    navigation.navigate('SportsGameCount' as never);
  };

  const renderOption = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    const isDisabled = !isSelected && selectedOptions.length >= 3;
    
    return (
      <TouchableOpacity
        key={option}
        style={[
          styles.optionButton,
          isSelected && styles.optionButtonSelected,
          isDisabled && styles.optionButtonDisabled
        ]}
        onPress={() => handleOptionToggle(option)}
        activeOpacity={0.8}
        disabled={isDisabled}
      >
        <Text style={[
          styles.optionText,
          isSelected && styles.optionTextSelected,
          isDisabled && styles.optionTextDisabled
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
          <View style={styles.logoContainer}>
            <Image source={Images.logoIcon} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Your Big 3?</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Which 3 sports do you enjoy the most:
        </Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map(renderOption)}
        </View>

        {/* Selection Count */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionCount}>
            {selectedOptions.length}/3 selected
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
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 40,
    marginLeft: -20,
  },
  logoContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 39,
    height: 39,
    marginRight: 12,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
    marginLeft: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Typography.fontFamily.display,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 40,
    marginTop: -20,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: Typography.fontFamily.primary,
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
    backgroundColor: '#5771FE',
    borderColor: '#5771FE',
  },
  optionButtonDisabled: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.primary,
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  optionTextDisabled: {
    opacity: 0.5,
  },
  selectionContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  selectionCount: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 66,
    fontFamily: Typography.fontFamily.primary,
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