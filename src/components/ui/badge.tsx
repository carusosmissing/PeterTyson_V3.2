import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Design } from '../../constants';

export interface BadgeProps {
  count?: number;
  text?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'base' | 'lg';
  dot?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  text,
  variant = 'primary',
  size = 'base',
  dot = false,
  style,
  textStyle,
}) => {
  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Design.borderRadius.badge,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: Design.dimensions.badge.minWidth,
      height: Design.dimensions.badge.height,
      paddingHorizontal: Design.dimensions.badge.padding,
    };

    if (dot) {
      return {
        ...baseStyle,
        width: size === 'sm' ? 8 : size === 'lg' ? 16 : 12,
        height: size === 'sm' ? 8 : size === 'lg' ? 16 : 12,
        minWidth: 0,
        paddingHorizontal: 0,
        borderRadius: 999,
      };
    }

    if (size === 'sm') {
      baseStyle.height = 16;
      baseStyle.minWidth = 16;
      baseStyle.paddingHorizontal = 2;
    } else if (size === 'lg') {
      baseStyle.height = 28;
      baseStyle.minWidth = 28;
      baseStyle.paddingHorizontal = 8;
    }

    // Color variants
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = Colors.button.secondary;
        break;
      case 'success':
        baseStyle.backgroundColor = Colors.status.success;
        break;
      case 'warning':
        baseStyle.backgroundColor = Colors.status.warning;
        break;
      case 'error':
        baseStyle.backgroundColor = Colors.status.error;
        break;
      case 'info':
        baseStyle.backgroundColor = Colors.status.info;
        break;
      default: // primary
        baseStyle.backgroundColor = Colors.primary;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = Typography.textStyles.badge;
    
    if (size === 'sm') {
      return {
        ...baseStyle,
        fontSize: 10,
        color: Colors.text.primary,
      };
    } else if (size === 'lg') {
      return {
        ...baseStyle,
        fontSize: 14,
        color: Colors.text.primary,
      };
    }

    return {
      ...baseStyle,
      color: Colors.text.primary,
    };
  };

  const getDisplayText = (): string => {
    if (text) return text;
    if (count !== undefined) {
      return count > 99 ? '99+' : count.toString();
    }
    return '';
  };

  const shouldShow = (): boolean => {
    if (dot) return true;
    if (text) return true;
    if (count !== undefined) return count > 0;
    return false;
  };

  if (!shouldShow()) return null;

  return (
    <View style={[getBadgeStyle(), style]}>
      {!dot && (
        <Text style={[getTextStyle(), textStyle]} numberOfLines={1}>
          {getDisplayText()}
        </Text>
      )}
    </View>
  );
}; 