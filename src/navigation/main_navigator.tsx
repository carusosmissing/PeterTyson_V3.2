import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';
import { Colors, Icons } from '../constants';
import { HomeScreen } from '../screens/main/home_screen';
import { ThePitScreen } from '../screens/main/the_pit_screen';
import { TheShrineScreen } from '../screens/main/the_shrine_screen';
import { SearchScreen } from '../screens/main/search_screen';
import { MessagingNavigator } from './messaging_navigator';
import { ProfileScreen } from '../screens/main/profile_screen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.tabBarBackground,
          borderTopColor: Colors.border,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500' as const,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'TruTUB',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Icons.home} 
              style={{ 
                width: size || 24, 
                height: size || 24, 
                tintColor: color 
              }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="ThePit" 
        component={ThePitScreen}
        options={{
          tabBarLabel: 'The Pit',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Icons.pit} 
              style={{ 
                width: size || 24, 
                height: size || 24, 
                tintColor: color 
              }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="TheShrine" 
        component={TheShrineScreen}
        options={{
          tabBarLabel: 'The Shrine',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Icons.shrine} 
              style={{ 
                width: size || 24, 
                height: size || 24, 
                tintColor: color 
              }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Icons.search} 
              style={{ 
                width: size || 24, 
                height: size || 24, 
                tintColor: color 
              }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Messaging" 
        component={MessagingNavigator}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Icons.messages} 
              style={{ 
                width: size || 24, 
                height: size || 24, 
                tintColor: color 
              }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Icons.profile} 
              style={{ 
                width: size || 24, 
                height: size || 24, 
                tintColor: color 
              }} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 