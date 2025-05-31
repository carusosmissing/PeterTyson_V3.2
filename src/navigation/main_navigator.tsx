import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabParamList } from '../types';
import { Colors, Icons, Images } from '../constants';
import { HomeScreen } from '../screens/main/home_screen';
import { ThePitScreen } from '../screens/main/the_pit_screen';
import { TheShrineScreen } from '../screens/main/the_shrine_screen';
import { GallerySearchScreen } from '../screens/main/gallery_search_screen';
import { MessagingNavigator } from './messaging_navigator';
import { ProfileScreen } from '../screens/profile/profile_screen';
import { EditProfileScreen } from '../screens/profile/edit_profile_screen';
import { SettingsScreen } from '../screens/main/settings_screen';
import { NotiScreen } from '../screens/main/noti_screen';
import { ProfileUser1Screen } from '../screens/profile/profile_user1_screen';
import { ProfileUser2Screen } from '../screens/profile/profile_user2_screen';
import { ProfileUser3Screen } from '../screens/profile/profile_user3_screen';
import { ProfileUser4Screen } from '../screens/profile/profile_user4_screen';
import { ProfileUser5Screen } from '../screens/profile/profile_user5_screen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderRadius: 30,
          marginHorizontal: 20,
          marginBottom: 25, // Back to 25 points
          position: 'absolute',
          // Make the space around the tab bar completely transparent
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => null, // Remove any default background
        tabBarActiveTintColor: Colors.primaryLight,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: '',
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
        name="Messaging" 
        component={MessagingNavigator}
        options={{
          tabBarLabel: '',
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
        name="TheShrine" 
        component={TheShrineScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Images.logo} 
              style={{ 
                width: size || 24, 
                height: size || 24, 
                resizeMode: 'contain'
              }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="ThePit" 
        component={ThePitScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={Icons.trophy} 
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
        component={GallerySearchScreen}
        options={{
          tabBarLabel: '',
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

          </Tab.Navigator>
    );
};

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="NotiScreen" component={NotiScreen} />
      <Stack.Screen name="ProfileUser1" component={ProfileUser1Screen} />
      <Stack.Screen name="ProfileUser2" component={ProfileUser2Screen} />
      <Stack.Screen name="ProfileUser3" component={ProfileUser3Screen} />
      <Stack.Screen name="ProfileUser4" component={ProfileUser4Screen} />
      <Stack.Screen name="ProfileUser5" component={ProfileUser5Screen} />
    </Stack.Navigator>
  );
}; 