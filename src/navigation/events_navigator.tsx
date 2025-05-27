import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsStackParamList } from '../types';
import { EventGalleryScreen } from '../screens/events/event_gallery_screen';
import { EventDetailsScreen } from '../screens/events/event_details_screen';

const Stack = createNativeStackNavigator<EventsStackParamList>();

export const EventsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="EventGallery"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EventGallery" component={EventGalleryScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}; 