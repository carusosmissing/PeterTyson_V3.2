import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { RootNavigator } from './src/navigation/root_navigator';
import { AppInitializer } from './src/components';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppInitializer>
        <RootNavigator />
      </AppInitializer>
    </Provider>
  );
}
