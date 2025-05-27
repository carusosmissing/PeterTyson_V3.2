import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Design, DesignUtils } from '../../constants';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'base',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  gradient = true,
}) => {
  const buttonHeight = Design.dimensions.button.height[size];
  const minWidth = Design.dimensions.button.minWidth[size];
  
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: buttonHeight,
      minWidth: fullWidth ? undefined : minWidth,
      width: fullWidth ? '100%' : undefined,
      borderRadius: Design.borderRadius.button,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
      paddingHorizontal: size === 'sm' ? 12 : size === 'lg' ? 20 : size === 'xl' ? 24 : 16,
      ...DesignUtils.createShadow(variant === 'ghost' ? 'none' : 'sm'),
    };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: Colors.button.disabled,
        opacity: 0.6,
      };
    }

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.button.secondary,
          borderWidth: 1,
          borderColor: Colors.border.secondary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: Colors.primary,
        };
      default: // primary
        return {
          ...baseStyle,
          backgroundColor: gradient ? undefined : Colors.button.primary,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle = size === 'sm' 
      ? Typography.textStyles.buttonSmall 
      : size === 'lg' || size === 'xl' 
      ? Typography.textStyles.buttonLarge 
      : Typography.textStyles.button;

    let color = Colors.text.primary;
    
    if (disabled) {
      color = Colors.text.muted;
    } else {
      switch (variant) {
        case 'outline':
          color = Colors.primary;
          break;
        case 'ghost':
          color = Colors.text.accent;
          break;
        default:
          color = Colors.text.primary;
      }
    }

    return {
      ...baseTextStyle,
      color,
      marginLeft: icon && iconPosition === 'left' ? 8 : 0,
      marginRight: icon && iconPosition === 'right' ? 8 : 0,
    };
  };

  const renderContent = () => (
    <>
      {icon && <>{icon}</>}
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? Colors.primary : Colors.text.primary}
          style={{ marginLeft: icon && iconPosition === 'left' ? 8 : 0 }}
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </>
  );

  const buttonStyle = [getButtonStyle(), style];

  if (variant === 'primary' && gradient && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={buttonStyle}
      >
        <LinearGradient
          colors={Colors.gradients.primary as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: Design.borderRadius.button },
          ]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={buttonStyle}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}; 