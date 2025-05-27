import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { Colors, Design, DesignUtils } from '../../constants';
import { Assets } from '../../constants/assets';
import { Badge } from './badge';

export interface AvatarProps {
  source?: string | number;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'circle' | 'rounded' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
  badge?: {
    count?: number;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
  onPress?: () => void;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  placeholder?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'base',
  variant = 'circle',
  status,
  showStatus = false,
  badge,
  onPress,
  style,
  imageStyle,
  placeholder,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const avatarSize = Design.dimensions.avatar[size];
  
  const getAvatarStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      width: avatarSize,
      height: avatarSize,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.background.tertiary,
      ...DesignUtils.createShadow('sm'),
    };

    switch (variant) {
      case 'circle':
        baseStyle.borderRadius = avatarSize / 2;
        break;
      case 'rounded':
        baseStyle.borderRadius = Design.borderRadius.md;
        break;
      case 'square':
        baseStyle.borderRadius = Design.borderRadius.sm;
        break;
    }

    return baseStyle;
  };

  const getImageStyle = (): ImageStyle => {
    const baseStyle: ImageStyle = {
      width: avatarSize,
      height: avatarSize,
    };

    switch (variant) {
      case 'circle':
        baseStyle.borderRadius = avatarSize / 2;
        break;
      case 'rounded':
        baseStyle.borderRadius = Design.borderRadius.md;
        break;
      case 'square':
        baseStyle.borderRadius = Design.borderRadius.sm;
        break;
    }

    return baseStyle;
  };

  const getStatusIndicatorStyle = (): ViewStyle => {
    const indicatorSize = Math.max(8, avatarSize * 0.2);
    const position = avatarSize * 0.1;
    
    let backgroundColor = Colors.status.success;
    switch (status) {
      case 'offline':
        backgroundColor = Colors.text.muted;
        break;
      case 'away':
        backgroundColor = Colors.status.warning;
        break;
      case 'busy':
        backgroundColor = Colors.status.error;
        break;
      default:
        backgroundColor = Colors.status.success;
    }

    return {
      position: 'absolute',
      bottom: position,
      right: position,
      width: indicatorSize,
      height: indicatorSize,
      borderRadius: indicatorSize / 2,
      backgroundColor,
      borderWidth: 2,
      borderColor: Colors.background.primary,
    };
  };

  const getBadgePosition = (): ViewStyle => {
    const badgeSize = 20;
    const position = -badgeSize / 4;
    
    return {
      position: 'absolute',
      top: position,
      right: position,
    };
  };

  const getImageSource = () => {
    if (imageError || !source) {
      return Assets.Images.avatarPlaceholder;
    }
    
    if (typeof source === 'string') {
      return { uri: source };
    }
    
    return source;
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const renderAvatar = () => (
    <View style={[getAvatarStyle(), style]}>
      <Image
        source={getImageSource()}
        style={[getImageStyle(), imageStyle]}
        onError={handleImageError}
        onLoad={handleImageLoad}
        resizeMode="cover"
      />
      
      {isLoading && !imageError && (
        <View style={[StyleSheet.absoluteFill, getAvatarStyle()]}>
          {placeholder}
        </View>
      )}
      
      {showStatus && status && (
        <View style={getStatusIndicatorStyle()} />
      )}
      
      {badge && (
        <View style={getBadgePosition()}>
          <Badge
            count={badge.count}
            variant={badge.variant}
            size="sm"
          />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {renderAvatar()}
      </TouchableOpacity>
    );
  }

  return renderAvatar();
}; 