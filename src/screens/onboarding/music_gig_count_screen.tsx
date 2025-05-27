import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import { addAnswer, nextStep } from '../../store';
import { Container, Button } from '../../components';

export const MusicGigCountScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state: any) => state.onboarding);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [
    '1 - 2 Events',
    '3 - 6 Events', 
    '7 - 10 Events',
    '11 - 14 Events',
    '15+ Events'
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (!selectedOption) return;
    
    // Save answer to Redux
    dispatch(addAnswer({
      questionId: 'music_gig_count',
      selectedOptions: [selectedOption]
    }));
    
    // Navigate to next screen based on selection
    navigation.navigate('MusicFanFuel' as never);
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
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🎯</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your gig count?</Text>
          <Text style={styles.subtitle}>
            How many live music events do you attend a year?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map(renderOption)}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="lg"
            fullWidth
            disabled={!selectedOption}
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
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
}); 