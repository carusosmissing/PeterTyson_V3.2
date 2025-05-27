import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Typography, Design, DesignUtils, Spacing } from '../../constants';

export interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'default' | 'glassmorphism' | 'transparent';
  showBorder?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  variant = 'glassmorphism',
  showBorder = true,
  style,
  titleStyle,
}) => {
  const getHeaderStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: Design.dimensions.header.height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.semantic.headerPadding,
      ...DesignUtils.createShadow('sm'),
    };

    if (showBorder) {
      baseStyle.borderBottomWidth = 1;
      baseStyle.borderBottomColor = Colors.border.primary;
    }

    switch (variant) {
      case 'glassmorphism':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          overflow: 'hidden',
        };
      case 'transparent':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: Colors.background.secondary,
        };
    }
  };

  const getTitleStyle = (): TextStyle => {
    return {
      ...Typography.textStyles.navTitle,
      color: Colors.text.primary,
      textAlign: 'center',
    };
  };

  const getSubtitleStyle = (): TextStyle => {
    return {
      ...Typography.textStyles.caption,
      color: Colors.text.secondary,
      textAlign: 'center',
      marginTop: 2,
    };
  };

  const renderIconButton = (
    icon: React.ReactNode,
    onPress?: () => void,
    side: 'left' | 'right' = 'left'
  ) => {
    if (!icon) {
      return <View style={styles.iconPlaceholder} />;
    }

    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.iconButton,
            side === 'right' && styles.rightIconButton,
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {icon}
        </TouchableOpacity>
      );
    }

    return (
      <View style={[
        styles.iconContainer,
        side === 'right' && styles.rightIconContainer,
      ]}>
        {icon}
      </View>
    );
  };

  const renderTitle = () => {
    if (!title && !subtitle) return null;

    return (
      <View style={styles.titleContainer}>
        {title && (
          <Text style={[getTitleStyle(), titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={getSubtitleStyle()} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  const headerContent = (
    <View style={[getHeaderStyle(), style]}>
      {renderIconButton(leftIcon, onLeftPress, 'left')}
      {renderTitle()}
      {renderIconButton(rightIcon, onRightPress, 'right')}
    </View>
  );

  if (variant === 'glassmorphism') {
    return (
      <View style={styles.glassmorphismContainer}>
        <BlurView
          intensity={20}
          style={[
            StyleSheet.absoluteFill,
            DesignUtils.createGlassmorphism('medium'),
          ]}
        />
        {headerContent}
      </View>
    );
  }

  return headerContent;
};

const styles = StyleSheet.create({
  glassmorphismContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  rightIconButton: {
    // Additional styles for right icon if needed
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    // Additional styles for right icon container if needed
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
}); 