import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types';
import { InboxScreen } from '../screens/messaging/inbox_screen';
import { DirectMessageScreen } from '../screens/messaging/direct_message_screen';
import { ChatScreen } from '../screens/messaging/chat_screen';
import { DMEmilyScreen } from '../screens/messaging/dm_emily_screen';
import { DMJiaraScreen } from '../screens/messaging/dm_jiara_screen';
import { DMLilaScreen } from '../screens/messaging/dm_lila_screen';

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
      <Stack.Screen name="DMEmily" component={DMEmilyScreen} />
      <Stack.Screen name="DMJiara" component={DMJiaraScreen} />
      <Stack.Screen name="DMLila" component={DMLilaScreen} />
    </Stack.Navigator>
  );
}; 