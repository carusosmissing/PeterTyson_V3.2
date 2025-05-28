import React from 'react';
import { View, ViewStyle, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Design, Spacing } from '../../constants';

export interface ContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'solid' | 'image';
  gradientType?: keyof typeof Design.gradients;
  customGradient?: string[];
  backgroundImage?: any;
  safeArea?: boolean;
  padding?: boolean;
  style?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'gradient',
  gradientType = 'background',
  customGradient,
  backgroundImage,
  safeArea = true,
  padding = true,
  style,
}) => {
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flex: 1,
    };

    if (padding) {
      baseStyle.paddingHorizontal = Spacing.semantic.screenPadding;
    }

    return baseStyle;
  };

  const getBackgroundStyle = (): ViewStyle => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: Colors.background.primary,
        };
      case 'default':
        return {
          backgroundColor: Colors.background.secondary,
        };
      case 'image':
        return {};
      default: // gradient
        return {};
    }
  };

  const renderContent = () => {
    const containerStyle = [getContainerStyle(), style];
    
    if (variant === 'image' && backgroundImage) {
      return (
        <ImageBackground
          source={backgroundImage}
          style={[StyleSheet.absoluteFill]}
          resizeMode="cover"
        >
          <View style={containerStyle}>
            {children}
          </View>
        </ImageBackground>
      );
    }
    
    if (variant === 'gradient') {
      const gradientColors = customGradient || Design.gradients[gradientType].colors;
      const gradientConfig = Design.gradients[gradientType];
      
      return (
        <LinearGradient
          colors={gradientColors as any}
          start={gradientConfig.start}
          end={gradientConfig.end}
          style={[StyleSheet.absoluteFill, getBackgroundStyle()]}
        >
          <View style={containerStyle}>
            {children}
          </View>
        </LinearGradient>
      );
    }

    return (
      <View style={[containerStyle, getBackgroundStyle()]}>
        {children}
      </View>
    );
  };

  if (safeArea) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderContent()}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent', // Make SafeAreaView transparent for bottom nav
  },
}); 