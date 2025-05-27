import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../types';
import { 
  MusicOrSportsScreen,
  MusicGigCountScreen,
  MusicFanFuelScreen,
  MusicVibeScreen,
  SportsGameCountScreen,
  SportsBig3Screen,
  SportsFanFuelScreen,
  WelcomeClaimScreen,
  WelcomeClaimRevealScreen
} from '../screens/onboarding';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MusicOrSports"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent swipe back during onboarding
      }}
    >
      {/* Initial selection screen */}
      <Stack.Screen name="MusicOrSports" component={MusicOrSportsScreen} />
      
      {/* Music flow screens */}
      <Stack.Screen name="MusicGigCount" component={MusicGigCountScreen} />
      <Stack.Screen name="MusicFanFuel" component={MusicFanFuelScreen} />
      <Stack.Screen name="MusicVibe" component={MusicVibeScreen} />
      
      {/* Sports flow screens */}
      <Stack.Screen name="SportsGameCount" component={SportsGameCountScreen} />
      <Stack.Screen name="SportsBig3" component={SportsBig3Screen} />
      <Stack.Screen name="SportsFanFuel" component={SportsFanFuelScreen} />
      
      {/* Final screens */}
              <Stack.Screen name="WelcomeClaimScreen" component={WelcomeClaimScreen} />
        <Stack.Screen name="ClaimReveal" component={WelcomeClaimRevealScreen} />
      

    </Stack.Navigator>
  );
}; 