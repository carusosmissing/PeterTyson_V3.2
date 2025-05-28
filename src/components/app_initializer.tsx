import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simple timeout to simulate initialization
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('App initialized successfully');
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  if (isInitializing) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#091343',
      }}>
        <ActivityIndicator size="large" color="#5771FE" />
        <Text style={{ color: '#FFFFFF', marginTop: 20 }}>Initializing...</Text>
      </View>
    );
  }

  return <>{children}</>;
}; 