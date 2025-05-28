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

// Emily Garcia conversation data
const emilyMessages: Message[] = [
  {
    id: '1',
    text: 'Great to meet you at MCR!',
    timestamp: '9:48 AM',
    isFromUser: false,
  },
  {
    id: '2',
    text: 'Likewise!',
    timestamp: '9:52 AM',
    isFromUser: true,
  },
  {
    id: '3',
    text: 'How did you win the golden belt buckle?!',
    timestamp: '10:00 AM',
    isFromUser: false,
  },
  {
    id: '4',
    text: 'My Stub upgrade and my streak perks! Gave me early access and we also got an exclusive Outriders tote',
    timestamp: '10:22 AM',
    isFromUser: true,
  },
  {
    id: '5',
    text: "Wow! I'm going to have to pay attention to the streaks and upgrades.",
    timestamp: '10:30 AM',
    isFromUser: false,
  },
  {
    id: '6',
    text: "You're in first place?! 🏆",
    timestamp: '10:30 AM',
    isFromUser: false,
  },
  {
    id: '7',
    text: 'You know it 🔥',
    timestamp: '10:48 AM',
    isFromUser: true,
    emoji: '🔥',
  },
];

export const DMEmilyScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [messageText, setMessageText] = useState('');
  
  // Emily Garcia specific data
  const contactName = 'Emily Garcia';
  const contactAvatar = Avatars.user3;
  const isOnline = true;
  const messages = emilyMessages;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate('NotiScreen' as never);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message to Emily:', messageText);
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
    <Container variant="image" backgroundImage={Images.background2} safeArea>
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
            <Image source={contactAvatar} style={styles.contactAvatar} />
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
            disabled={!messageText.trim()}
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
    backgroundColor: '#D7F0FC',
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
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  contactMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#5771FE',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 