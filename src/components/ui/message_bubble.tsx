import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Design, DesignUtils, Spacing } from '../../constants';
import { Avatar } from './avatar';

export interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    messageType: 'text' | 'image' | 'file';
    timestamp: string;
    senderId: string;
    senderName?: string;
    senderAvatar?: string;
  };
  isCurrentUser: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  showAvatar = true,
  showTimestamp = true,
  onPress,
  onLongPress,
  style,
}) => {
  const getBubbleStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      maxWidth: '80%',
      borderRadius: Design.borderRadius.lg,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginVertical: 2,
      ...DesignUtils.createShadow('sm'),
    };

    if (isCurrentUser) {
      return {
        ...baseStyle,
        backgroundColor: Colors.primary,
        alignSelf: 'flex-end',
        marginRight: showAvatar ? 8 : 16,
        borderBottomRightRadius: 4,
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: Colors.background.card,
        alignSelf: 'flex-start',
        marginLeft: showAvatar ? 8 : 16,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: Colors.border.primary,
      };
    }
  };

  const getTextStyle = (): TextStyle => {
    return {
      ...Typography.textStyles.body,
      color: isCurrentUser ? Colors.text.primary : Colors.text.primary,
    };
  };

  const getTimestampStyle = (): TextStyle => {
    return {
      ...Typography.textStyles.caption,
      color: isCurrentUser ? Colors.text.secondary : Colors.text.tertiary,
      marginTop: 4,
      textAlign: isCurrentUser ? 'right' : 'left',
    };
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderMessageContent = () => {
    switch (message.messageType) {
      case 'image':
        return (
          <View>
            <Image
              source={{ uri: message.content }}
              style={styles.messageImage}
              resizeMode="cover"
            />
          </View>
        );
      case 'file':
        return (
          <View style={styles.fileContainer}>
            <Text style={styles.fileIcon}>📎</Text>
            <Text style={[getTextStyle(), styles.fileName]}>
              {message.content.split('/').pop() || 'File'}
            </Text>
          </View>
        );
      default: // text
        return (
          <Text style={getTextStyle()}>
            {message.content}
          </Text>
        );
    }
  };

  const renderAvatar = () => {
    if (!showAvatar || isCurrentUser) return null;

    return (
      <View style={styles.avatarContainer}>
        <Avatar
          source={message.senderAvatar}
          size="sm"
          variant="circle"
        />
      </View>
    );
  };

  const renderBubble = () => (
    <View style={[styles.messageContainer, isCurrentUser && styles.currentUserContainer]}>
      {renderAvatar()}
      
      <View style={getBubbleStyle()}>
        {!isCurrentUser && message.senderName && (
          <Text style={styles.senderName}>
            {message.senderName}
          </Text>
        )}
        
        {renderMessageContent()}
        
        {showTimestamp && (
          <Text style={getTimestampStyle()}>
            {formatTimestamp(message.timestamp)}
          </Text>
        )}
      </View>
    </View>
  );

  if (onPress || onLongPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.8}
        style={style}
      >
        {renderBubble()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={style}>
      {renderBubble()}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
  },
  currentUserContainer: {
    flexDirection: 'row-reverse',
  },
  avatarContainer: {
    marginBottom: 8,
    marginHorizontal: 8,
  },
  senderName: {
    ...Typography.textStyles.caption,
    color: Colors.text.accent,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: Design.borderRadius.md,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  fileIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  fileName: {
    flex: 1,
    textDecorationLine: 'underline',
  },
}); 