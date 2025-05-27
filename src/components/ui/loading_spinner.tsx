import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Design } from '../../constants';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = Colors.primary,
  text,
  overlay = false,
  style,
  textStyle,
}) => {
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (overlay) {
      return {
        ...baseStyle,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background.modal,
        zIndex: 1000,
      };
    }

    return {
      ...baseStyle,
      padding: 20,
    };
  };

  const getTextStyle = (): TextStyle => {
    return {
      ...Typography.textStyles.body,
      color: Colors.text.secondary,
      marginTop: 16,
      textAlign: 'center',
    };
  };

  return (
    <View style={[getContainerStyle(), style]}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={[getTextStyle(), textStyle]}>
          {text}
        </Text>
      )}
    </View>
  );
}; 