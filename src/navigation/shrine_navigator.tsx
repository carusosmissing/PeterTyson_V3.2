import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShrineStackParamList } from '../types';
import { ShrineView1Screen } from '../screens/shrine/shrine_view_1_screen';
import { ShrineView2Screen } from '../screens/shrine/shrine_view_2_screen';

const Stack = createNativeStackNavigator<ShrineStackParamList>();

export const ShrineNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ShrineView1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ShrineView1" component={ShrineView1Screen} />
      <Stack.Screen name="ShrineView2" component={ShrineView2Screen} />
    </Stack.Navigator>
  );
}; 