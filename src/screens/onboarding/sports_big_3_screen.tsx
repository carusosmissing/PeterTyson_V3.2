import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🎯</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Big 3?</Text>
          <Text style={styles.subtitle}>
            Which 3 sports do you enjoy the most:
          </Text>
        </View>

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

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="lg"
            fullWidth
            disabled={selectedOptions.length === 0}
            gradient={true}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  optionButtonDisabled: {
    opacity: 0.5,
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
  optionTextDisabled: {
    opacity: 0.5,
  },
  selectionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectionCount: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
}); 