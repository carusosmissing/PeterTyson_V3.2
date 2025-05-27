import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors, Design, DesignUtils } from '../../constants';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glassmorphism' | 'gradient' | 'blur';
  size?: 'sm' | 'base' | 'lg';
  shadow?: keyof typeof Design.shadows;
  borderRadius?: keyof typeof Design.borderRadius;
  style?: ViewStyle;
  gradientColors?: string[];
  blurIntensity?: number;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'base',
  shadow = 'base',
  borderRadius = 'card',
  style,
  gradientColors,
  blurIntensity = 15,
  onPress,
}) => {
  const getCardStyle = (): ViewStyle => {
    const padding = size === 'sm' ? 12 : size === 'lg' ? 24 : 16;
    
    const baseStyle: ViewStyle = {
      borderRadius: Design.borderRadius[borderRadius],
      padding,
      ...DesignUtils.createShadow(shadow),
    };

    switch (variant) {
      case 'glassmorphism':
        return {
          ...baseStyle,
          ...DesignUtils.createGlassmorphism('medium'),
        };
      case 'gradient':
        return {
          ...baseStyle,
          overflow: 'hidden',
        };
      case 'blur':
        return {
          ...baseStyle,
          overflow: 'hidden',
          backgroundColor: 'transparent',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: Colors.background.card,
          borderWidth: 1,
          borderColor: Colors.border.primary,
        };
    }
  };

  const renderCardContent = () => {
    if (variant === 'gradient') {
      const colors = gradientColors || Colors.gradients.card;
      return (
        <View style={[getCardStyle(), style]}>
          <LinearGradient
            colors={colors as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              StyleSheet.absoluteFill,
              { borderRadius: Design.borderRadius[borderRadius] },
            ]}
          />
          <View style={styles.content}>
            {children}
          </View>
        </View>
      );
    }

    if (variant === 'blur') {
      return (
        <View style={[getCardStyle(), style]}>
          <BlurView
            intensity={blurIntensity}
            style={[
              StyleSheet.absoluteFill,
              { borderRadius: Design.borderRadius[borderRadius] },
            ]}
          />
          <View style={styles.content}>
            {children}
          </View>
        </View>
      );
    }

    return (
      <View style={[getCardStyle(), style]}>
        {children}
      </View>
    );
  };

  if (onPress) {
    return (
      <View style={styles.touchableContainer}>
        {renderCardContent()}
      </View>
    );
  }

  return renderCardContent();
};

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    zIndex: 1,
  },
  touchableContainer: {
    // Add touchable styles if needed
  },
}); 