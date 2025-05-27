import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppSelector } from '../store';
import { AuthNavigator } from './auth_navigator';
import { OnboardingNavigator } from './onboarding_navigator';
import { MainNavigator } from './main_navigator';
import { EventsNavigator } from './events_navigator';
import { ShrineNavigator } from './shrine_navigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  // Get authentication and onboarding state from Redux
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
  const hasCompletedOnboarding = useAppSelector((state: any) => state.onboarding.hasCompletedOnboarding);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : !hasCompletedOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen 
              name="Events" 
              component={EventsNavigator}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen 
              name="Shrine" 
              component={ShrineNavigator}
              options={{ presentation: 'modal' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 