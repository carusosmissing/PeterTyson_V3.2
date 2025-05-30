import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { RootNavigator } from './src/navigation/root_navigator';
import { AppInitializer } from './src/components';
import { useFonts, Rubik_300Light, Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from '@expo-google-fonts/rubik';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Rubik-Light': Rubik_300Light,
    'Rubik-Regular': Rubik_400Regular,
    'Rubik-Medium': Rubik_500Medium,
    'Rubik-SemiBold': Rubik_600SemiBold,
    'Rubik-Bold': Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppInitializer>
        <RootNavigator />
      </AppInitializer>
    </Provider>
  );
}
