import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../types';
import { MusicOrSportsScreen } from '../screens/onboarding/music_or_sports_screen';
import { MusicOnboardingQuestionsScreen } from '../screens/onboarding/music_onboarding_questions_screen';
import { SportsOnboardingQuestionsScreen } from '../screens/onboarding/sports_onboarding_questions_screen';
import { ClaimScreen } from '../screens/onboarding/claim_screen';
import { ClaimRevealScreen } from '../screens/onboarding/claim_reveal_screen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MusicOrSports"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MusicOrSports" component={MusicOrSportsScreen} />
      <Stack.Screen name="MusicOnboardingQuestions" component={MusicOnboardingQuestionsScreen} />
      <Stack.Screen name="SportsOnboardingQuestions" component={SportsOnboardingQuestionsScreen} />
      <Stack.Screen name="Claim" component={ClaimScreen} />
      <Stack.Screen name="ClaimReveal" component={ClaimRevealScreen} />
    </Stack.Navigator>
  );
}; 