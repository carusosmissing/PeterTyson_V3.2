import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  TextInput,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Images, Icons, Avatars } from '../../constants';
import { Container } from '../../components';
import { getAvatarSource } from '../../utils/avatar_utils';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromUser: boolean;
  emoji?: string;
}

// Jiara Martins conversation data
const jiaraMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! Hope you can make it to the VIP lounge tonight',
    timestamp: '1:45 PM',
    isFromUser: false,
  },
  {
    id: '2',
    text: 'Absolutely! What time should I be there?',
    timestamp: '1:52 PM',
    isFromUser: true,
  },
  {
    id: '3',
    text: "Visit the VIP Exclusive's Lounge.",
    timestamp: '2:11 PM',
    isFromUser: false,
  },
];

export const DMJiaraScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [messageText, setMessageText] = useState('');
  
  // Jiara Martins specific data
  const contactName = 'Jiara Martins';
  const contactAvatar = Avatars.user1;
  const isOnline = true;
  const messages = jiaraMessages;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleContactProfilePress = () => {
    navigation.navigate('ProfileUser1' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message to Jiara:', messageText);
      setMessageText('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isFromUser ? styles.userMessageContainer : styles.contactMessageContainer
    ]}>
      <View style={[
        styles.messageBubble,
        item.isFromUser ? styles.userMessageBubble : styles.contactMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isFromUser ? styles.userMessageText : styles.contactMessageText
        ]}>
          {item.text} {item.emoji && item.emoji}
        </Text>
      </View>
      <Text style={[
        styles.timestamp,
        item.isFromUser ? styles.userTimestamp : styles.contactTimestamp
      ]}>
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <Container variant="image" backgroundImage={Images.welcomeBackground} safeArea>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Image source={Icons.back} style={styles.backIcon} />
          </TouchableOpacity>
          
          <View style={styles.contactInfo}>
            <TouchableOpacity onPress={handleContactProfilePress}>
              <Image source={contactAvatar} style={styles.contactAvatar} />
            </TouchableOpacity>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>{contactName}</Text>
              {isOnline && (
                <View style={styles.onlineStatus}>
                  <View style={styles.onlineIndicator} />
                  <Text style={styles.onlineText}>Online Now</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
              <Image 
                source={getAvatarSource('pete', 'asset')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationContainer} onPress={handleNotificationPress}>
              <Image source={Icons.notification} style={styles.notificationIcon} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="New Chat"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingTop: 60,
    paddingBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
    fontFamily: Typography.fontFamily.secondary,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7DD3B9',
    marginRight: 6,
  },
  onlineText: {
    fontSize: 14,
    color: '#7DD3B9',
    fontWeight: '500',
    fontFamily: Typography.fontFamily.secondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginRight: -15,
    marginTop: -7,
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Typography.fontFamily.secondary,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 15,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  contactMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  userMessageBubble: {
    backgroundColor: '#5771FE',
    borderBottomRightRadius: 8,
  },
  contactMessageBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: 8,
  },
  messageText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.primary,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  contactMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    fontFamily: Typography.fontFamily.primary,
  },
  userTimestamp: {
    color: '#FFFFFF',
    textAlign: 'right',
  },
  contactTimestamp: {
    color: '#FFFFFF',
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingBottom: 100,
    paddingTop: 15,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontFamily: Typography.fontFamily.primary,
  },
  sendButton: {
    backgroundColor: '#D7F0FC',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sendButtonText: {
    color: '#1A365D',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Typography.fontFamily.secondary,
  },
}); 