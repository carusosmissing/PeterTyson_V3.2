import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { Colors, Typography, Design, DesignUtils } from '../../constants';

export interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  size?: 'sm' | 'base' | 'lg';
  variant?: 'default' | 'glassmorphism';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  disabled = false,
  size = 'base',
  variant = 'default',
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  showPasswordToggle = false,
  style,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputHeight = Design.dimensions.input.height[size];
  
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      marginBottom: 16,
    };

    return baseStyle;
  };

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: inputHeight,
      borderRadius: Design.borderRadius.input,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderWidth: 1,
    };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: Colors.input.background,
        borderColor: Colors.border.primary,
        opacity: 0.6,
      };
    }

    if (error) {
      return {
        ...baseStyle,
        backgroundColor: variant === 'glassmorphism' 
          ? DesignUtils.createGlassmorphism('light').backgroundColor
          : Colors.input.background,
        borderColor: Colors.input.error,
        ...DesignUtils.createShadow('sm', Colors.status.error),
      };
    }

    if (isFocused) {
      return {
        ...baseStyle,
        backgroundColor: variant === 'glassmorphism' 
          ? DesignUtils.createGlassmorphism('medium').backgroundColor
          : Colors.input.background,
        borderColor: Colors.input.focus,
        ...DesignUtils.createShadow('sm', Colors.shadow.colored),
      };
    }

    return {
      ...baseStyle,
      backgroundColor: variant === 'glassmorphism' 
        ? DesignUtils.createGlassmorphism('light').backgroundColor
        : Colors.input.background,
      borderColor: Colors.input.border,
    };
  };

  const getInputStyle = (): TextStyle => {
    const baseStyle = Typography.textStyles.input;
    
    return {
      ...baseStyle,
      flex: 1,
      color: disabled ? Colors.text.muted : Colors.text.primary,
      marginLeft: leftIcon ? 12 : 0,
      marginRight: (rightIcon || showPasswordToggle) ? 12 : 0,
    };
  };

  const getLabelStyle = (): TextStyle => {
    const baseStyle = Typography.textStyles.inputLabel;
    
    return {
      ...baseStyle,
      color: error ? Colors.status.error : Colors.text.secondary,
      marginBottom: 8,
    };
  };

  const getHelperTextStyle = (): TextStyle => {
    const baseStyle = Typography.textStyles.inputHelper;
    
    return {
      ...baseStyle,
      color: error ? Colors.status.error : Colors.text.tertiary,
      marginTop: 4,
    };
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderPasswordToggle = () => {
    if (!showPasswordToggle) return null;
    
    return (
      <TouchableOpacity
        onPress={handlePasswordToggle}
        style={styles.iconButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={{ color: Colors.text.tertiary, fontSize: 16 }}>
          {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRightIcon = () => {
    if (showPasswordToggle) {
      return renderPasswordToggle();
    }
    
    if (rightIcon) {
      return onRightIconPress ? (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconContainer}>
          {rightIcon}
        </View>
      );
    }
    
    return null;
  };

  return (
    <View style={[getContainerStyle(), style]}>
      {label && (
        <Text style={[getLabelStyle(), labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          {...textInputProps}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.input.placeholder}
          secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[getInputStyle(), inputStyle]}
        />
        
        {renderRightIcon()}
      </View>
      
      {(error || helperText) && (
        <Text style={getHelperTextStyle()}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
}); 