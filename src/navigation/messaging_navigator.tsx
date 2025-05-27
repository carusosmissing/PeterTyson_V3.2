import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types';
import { InboxScreen } from '../screens/messaging/inbox_screen';
import { DirectMessageScreen } from '../screens/messaging/direct_message_screen';
import { ChatScreen } from '../screens/messaging/chat_screen';

const Stack = createNativeStackNavigator<MessagingStackParamList>();

export const MessagingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="DirectMessage" component={DirectMessageScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}; 