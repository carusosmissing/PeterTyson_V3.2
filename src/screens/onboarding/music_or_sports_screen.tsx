import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import { setSelectedCategory } from '../../store';
import { Container, Button, Card } from '../../components';

export const MusicOrSportsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state: any) => state.onboarding);

  const handleMusicSelection = () => {
    dispatch(setSelectedCategory('music'));
    navigation.navigate('MusicOnboardingQuestions' as never);
  };

  const handleSportsSelection = () => {
    dispatch(setSelectedCategory('sports'));
    navigation.navigate('SportsOnboardingQuestions' as never);
  };

  return (
    <Container variant="gradient" gradientType="background" safeArea>
      <View style={styles.content}>
        <Card variant="glassmorphism" size="lg" style={styles.card}>
          <Text style={styles.title}>What interests you?</Text>
          <Text style={styles.subtitle}>
            Choose your primary interest to get personalized content
          </Text>
          
          {selectedCategory && (
            <Text style={styles.selectedText}>
              Currently selected: {selectedCategory}
            </Text>
          )}
          
          <View style={styles.buttonContainer}>
            <Button
              title="🎵 Music"
              onPress={handleMusicSelection}
              variant={selectedCategory === 'music' ? 'primary' : 'secondary'}
              size="lg"
              fullWidth
              gradient={selectedCategory === 'music'}
            />
            
            <Button
              title="⚽ Sports"
              onPress={handleSportsSelection}
              variant={selectedCategory === 'sports' ? 'primary' : 'secondary'}
              size="lg"
              fullWidth
              gradient={selectedCategory === 'sports'}
            />
          </View>
        </Card>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    ...Typography.textStyles.h1,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    ...Typography.textStyles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  selectedText: {
    ...Typography.textStyles.bodySmall,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
}); 