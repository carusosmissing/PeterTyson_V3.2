import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Typography, Layout, Assets } from '../../constants';
import { Avatar } from '../../components/ui/avatar';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateProfile } from '../../store';
import { getAvatarSource } from '../../utils/avatar_utils';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state: any) => state.user.profile);

  const [username, setUsername] = useState(userProfile?.username || 'demo');
  const [handle, setHandle] = useState(userProfile?.handle || '@demo');
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar || 'pete');
  const [avatarType, setAvatarType] = useState<'asset' | 'custom'>(userProfile?.avatarType || 'asset');
  const [bio, setBio] = useState(userProfile?.bio || 'Your bio goes here! Share your hobbies, motivations, and fitness goals.');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(userProfile?.genres || []);
  const [backgroundColor, setBackgroundColor] = useState(userProfile?.backgroundColor || '#000000');
  const [backgroundImage, setBackgroundImage] = useState(userProfile?.backgroundImage || null);
  const [backgroundType, setBackgroundType] = useState<'color' | 'image'>(userProfile?.backgroundType || 'color');
  const [selectedSports, setSelectedSports] = useState<string[]>(userProfile?.sports || []);

  // Available avatars from assets
  const availableAvatars = [
    { key: 'pete', source: Assets.Avatars.pete, name: 'Pete' },
    { key: 'user1', source: Assets.Avatars.user1, name: 'Avatar 1' },
    { key: 'user2', source: Assets.Avatars.user2, name: 'Avatar 2' },
    { key: 'user3', source: Assets.Avatars.user3, name: 'Avatar 3' },
    { key: 'user4', source: Assets.Avatars.user4, name: 'Avatar 4' },
    { key: 'user5', source: Assets.Avatars.user5, name: 'Avatar 5' },
  ];

  // Available music genres
  const availableGenres = [
    'Hip Hop', 'Pop', 'Rock', 'R&B', 'Jazz', 'Electronic', 'Country', 'Folk',
    'Classical', 'Reggae', 'Blues', 'Funk', 'Soul', 'Alternative', 'Indie',
    'Metal', 'Punk', 'Disco', 'House', 'Techno', 'Trap', 'Drill', 'Afrobeats'
  ];

  // Available sports
  const availableSports = [
    'Basketball', 'Football', 'Soccer', 'Baseball', 'Tennis', 'Golf', 'Boxing', 'MMA',
    'Hockey', 'Swimming', 'Track & Field', 'Volleyball', 'Gymnastics', 'Wrestling',
    'Cycling', 'Skiing', 'Surfing', 'Skateboarding', 'CrossFit', 'Yoga', 'Climbing', 'Rugby'
  ];

  // Background color options
  const backgroundColors = [
    { name: 'Black', color: '#000000' },
    { name: 'Light Gray', color: '#ECECEC' },
    { name: 'Light Blue', color: '#D7F0FC' },
    { name: 'Dark Gray', color: '#2D3748' },
    { name: 'Navy Blue', color: '#2B6CB0' },
    { name: 'Lakers Purple', color: '#552583' },
    { name: 'Forest Green', color: '#059669' },
    { name: 'Teal', color: '#0891B2' },
    { name: 'Pink', color: '#DB2777' },
    { name: 'Indigo', color: '#4338CA' },
  ];

  // Available background images
  const backgroundImages = [
    { name: 'Neon Glow', source: Assets.Images.background1, key: 'background1' },
    { name: 'Purple Haze', source: Assets.Images.background2, key: 'background2' },
    { name: 'Electric Dreams', source: Assets.Images.background3, key: 'background3' },
  ];

  const handleGenreSelect = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      // Remove genre if already selected
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      // Add genre if less than 3 selected
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSportSelect = (sport: string) => {
    if (selectedSports.includes(sport)) {
      // Remove sport if already selected
      setSelectedSports(selectedSports.filter(s => s !== sport));
    } else if (selectedSports.length < 3) {
      // Add sport if less than 3 selected
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleSave = () => {
    // Validate inputs
    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    if (!handle.trim() || !handle.startsWith('@')) {
      Alert.alert('Error', 'Handle must start with @ and cannot be empty');
      return;
    }

    // Update profile in store
    dispatch(updateProfile({
      username: username.trim(),
      handle: handle.trim(),
      avatar: selectedAvatar,
      avatarType: avatarType,
      bio: bio.trim(),
      genres: selectedGenres,
      sports: selectedSports,
      backgroundColor: backgroundColor,
      backgroundImage: backgroundImage,
      backgroundType: backgroundType,
    }));

    // Navigate back to profile screen
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const formatHandle = (text: string) => {
    // Ensure handle always starts with @
    if (!text.startsWith('@')) {
      return '@' + text.replace('@', '');
    }
    return text;
  };

  const handleImageSelected = (imageUri: string) => {
    console.log('🎯 Image selected in profile screen:', imageUri);
    setSelectedAvatar(imageUri);
    setAvatarType('custom');
    console.log('🎯 Avatar updated to custom type');
  };

  const handleImageError = (error: string) => {
    console.log('❌ Image error:', error);
    Alert.alert('Error', `Failed to select image: ${error}`);
  };

  const handleCameraPress = async () => {
    console.log('📷 Camera button pressed');
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('📷 Image selected:', result.assets[0].uri);
        handleImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      handleImageError('Failed to take photo');
    }
  };

  const handleGalleryPress = async () => {
    console.log('🖼️ Gallery button pressed');
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need photo library permissions!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('🖼️ Image selected:', result.assets[0].uri);
        handleImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      handleImageError('Failed to select image');
    }
  };

  const getCurrentAvatarSource = () => {
    const source = getAvatarSource(selectedAvatar, avatarType);
    console.log('🖼️ Current avatar source:', source, 'Type:', avatarType, 'Avatar:', selectedAvatar);
    return source;
  };

  return (
    <ImageBackground 
      source={Assets.Images.welcomeBackground} 
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Image source={Assets.Icons.close} style={styles.headerIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Image source={Assets.Icons.verified} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        {/* Current Profile Preview */}
        <View style={styles.previewSection}>
          <View style={styles.avatarContainer}>
            <Avatar
              source={getCurrentAvatarSource()}
              size="3xl"
              variant="circle"
              style={styles.avatar}
            />
          </View>
          <Text style={styles.previewUsername}>{username}</Text>
          <Text style={styles.previewHandle}>{handle}</Text>
        </View>

        {/* Edit Form */}
        <View style={styles.formContainer}>
          {/* Avatar Selection */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            
            {/* Upload Custom Photo Button */}
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => {
                console.log('🔥 Upload button clicked directly');
                Alert.alert('Select Image', 'Choose how you\'d like to add an image', [
                  { text: 'Camera', onPress: () => handleCameraPress() },
                  { text: 'Gallery', onPress: () => handleGalleryPress() },
                  { text: 'Cancel', style: 'cancel' }
                ]);
              }}
            >
              <Image source={Assets.Icons.camera} style={styles.uploadIcon} />
              <Text style={styles.uploadButtonText}>Upload Custom Photo</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or choose from presets</Text>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.avatarScrollView}
              contentContainerStyle={styles.avatarScrollContent}
            >
              {availableAvatars.map((avatar) => (
                <TouchableOpacity
                  key={avatar.key}
                  style={[
                    styles.avatarOption,
                    selectedAvatar === avatar.key && avatarType === 'asset' && styles.selectedAvatarOption
                  ]}
                  onPress={() => {
                    setSelectedAvatar(avatar.key);
                    setAvatarType('asset');
                  }}
                >
                  <Avatar
                    source={avatar.source}
                    size="lg"
                    variant="circle"
                    style={styles.optionAvatar}
                  />
                  <Text style={styles.avatarOptionName}>{avatar.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Username Input */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                maxLength={30}
              />
            </View>
          </View>

          {/* Handle Input */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Handle</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={handle}
                onChangeText={(text) => setHandle(formatHandle(text))}
                placeholder="@username"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                maxLength={31} // 30 + @ symbol
              />
            </View>
          </View>

          {/* Bio Input */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Bio</Text>
            <View style={[styles.inputContainer, styles.bioInputContainer]}>
              <TextInput
                style={[styles.textInput, styles.bioTextInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell people about yourself..."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                maxLength={150}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <Text style={styles.characterCount}>{bio.length}/150</Text>
          </View>

          {/* Top 3 Genres */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Top 3 Genres ({selectedGenres.length}/3)</Text>
            
            {/* Selected Genres */}
            {selectedGenres.length > 0 && (
              <View style={styles.selectedGenresContainer}>
                {selectedGenres.map((genre, index) => (
                  <TouchableOpacity
                    key={genre}
                    style={styles.selectedGenreTag}
                    onPress={() => handleGenreSelect(genre)}
                  >
                    <Text style={styles.selectedGenreText}>{genre}</Text>
                    <Image source={Assets.Icons.close} style={styles.removeGenreIcon} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Available Genres */}
            <View style={styles.genresContainer}>
              {availableGenres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={[
                    styles.genreTag,
                    selectedGenres.includes(genre) && styles.selectedGenreTagFaded,
                    selectedGenres.length >= 3 && !selectedGenres.includes(genre) && styles.disabledGenreTag
                  ]}
                  onPress={() => handleGenreSelect(genre)}
                  disabled={selectedGenres.length >= 3 && !selectedGenres.includes(genre)}
                >
                  <Text style={[
                    styles.genreText,
                    selectedGenres.includes(genre) && styles.selectedGenreTextFaded,
                    selectedGenres.length >= 3 && !selectedGenres.includes(genre) && styles.disabledGenreText
                  ]}>
                    {genre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Top 3 Sports */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Top 3 Sports ({selectedSports.length}/3)</Text>
            
            {/* Selected Sports */}
            {selectedSports.length > 0 && (
              <View style={styles.selectedSportsContainer}>
                {selectedSports.map((sport, index) => (
                  <TouchableOpacity
                    key={sport}
                    style={styles.selectedSportTag}
                    onPress={() => handleSportSelect(sport)}
                  >
                    <Text style={styles.selectedSportText}>{sport}</Text>
                    <Image source={Assets.Icons.close} style={styles.removeSportIcon} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Available Sports */}
            <View style={styles.sportsContainer}>
              {availableSports.map((sport) => (
                <TouchableOpacity
                  key={sport}
                  style={[
                    styles.sportTag,
                    selectedSports.includes(sport) && styles.selectedSportTagFaded,
                    selectedSports.length >= 3 && !selectedSports.includes(sport) && styles.disabledSportTag
                  ]}
                  onPress={() => handleSportSelect(sport)}
                  disabled={selectedSports.length >= 3 && !selectedSports.includes(sport)}
                >
                  <Text style={[
                    styles.sportText,
                    selectedSports.includes(sport) && styles.selectedSportTextFaded,
                    selectedSports.length >= 3 && !selectedSports.includes(sport) && styles.disabledSportText
                  ]}>
                    {sport}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Background Color Selection */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Background</Text>
            
            {/* Background Type Toggle */}
            <View style={styles.backgroundTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.backgroundTypeButton,
                  backgroundType === 'color' && styles.selectedBackgroundTypeButton
                ]}
                onPress={() => setBackgroundType('color')}
              >
                <Text style={[
                  styles.backgroundTypeText,
                  backgroundType === 'color' && styles.selectedBackgroundTypeText
                ]}>
                  Colors
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.backgroundTypeButton,
                  backgroundType === 'image' && styles.selectedBackgroundTypeButton
                ]}
                onPress={() => setBackgroundType('image')}
              >
                <Text style={[
                  styles.backgroundTypeText,
                  backgroundType === 'image' && styles.selectedBackgroundTypeText
                ]}>
                  Images
                </Text>
              </TouchableOpacity>
            </View>

            {/* Background Colors */}
            {backgroundType === 'color' && (
              <View style={styles.colorOptionsContainer}>
                {backgroundColors.map((colorOption) => (
                  <TouchableOpacity
                    key={colorOption.name}
                    style={[
                      styles.colorOption,
                      { backgroundColor: colorOption.color },
                      backgroundColor === colorOption.color && backgroundType === 'color' && styles.selectedColorOption
                    ]}
                    onPress={() => {
                      setBackgroundColor(colorOption.color);
                      setBackgroundType('color');
                    }}
                  >
                    {backgroundColor === colorOption.color && backgroundType === 'color' && (
                      <Image source={Assets.Icons.verified} style={styles.colorSelectedIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Background Images */}
            {backgroundType === 'image' && (
              <View style={styles.imageOptionsContainer}>
                {backgroundImages.map((imageOption) => (
                  <TouchableOpacity
                    key={imageOption.key}
                    style={[
                      styles.imageOption,
                      backgroundImage === imageOption.key && styles.selectedImageOption
                    ]}
                    onPress={() => {
                      setBackgroundImage(imageOption.key);
                      setBackgroundType('image');
                    }}
                  >
                    <Image source={imageOption.source} style={styles.imageOptionPreview} />
                    {backgroundImage === imageOption.key && (
                      <View style={styles.imageSelectedOverlay}>
                        <Image source={Assets.Icons.verified} style={styles.imageSelectedIcon} />
                      </View>
                    )}
                    <Text style={styles.imageOptionText}>{imageOption.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButtonLarge} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButtonLarge} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  cancelButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  previewSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  previewUsername: {
    fontSize: 28,
    fontWeight: '300',
    color: 'white',
    marginBottom: 4,
  },
  previewHandle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(87, 113, 254, 0.2)',
    borderWidth: 2,
    borderColor: '#5771FE',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    marginRight: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  orText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 16,
  },
  avatarScrollView: {
    marginHorizontal: -10,
  },
  avatarScrollContent: {
    paddingHorizontal: 10,
  },
  avatarOption: {
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 80,
  },
  selectedAvatarOption: {
    backgroundColor: 'rgba(87, 113, 254, 0.3)',
    borderWidth: 2,
    borderColor: '#5771FE',
  },
  optionAvatar: {
    marginBottom: 8,
  },
  avatarOptionName: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textInput: {
    padding: 16,
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  saveButtonLarge: {
    backgroundColor: '#5771FE',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  cancelButtonLarge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  bioInputContainer: {
    height: 120,
  },
  bioTextInput: {
    height: '100%',
  },
  characterCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'right',
    marginTop: 4,
  },
  selectedGenresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  selectedGenreTag: {
    backgroundColor: '#5771FE',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedGenreText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  removeGenreIcon: {
    width: 12,
    height: 12,
    tintColor: 'white',
    marginLeft: 6,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedGenreTagFaded: {
    backgroundColor: 'rgba(87, 113, 254, 0.3)',
  },
  disabledGenreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  genreText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  selectedGenreTextFaded: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  disabledGenreText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: '18%',
    height: 60,
    borderRadius: 12,
    marginRight: '2%',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorOption: {
    borderColor: '#5771FE',
    borderWidth: 3,
  },
  colorSelectedIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  selectedSportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  selectedSportTag: {
    backgroundColor: '#5771FE',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSportText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  removeSportIcon: {
    width: 12,
    height: 12,
    tintColor: 'white',
    marginLeft: 6,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSportTagFaded: {
    backgroundColor: 'rgba(87, 113, 254, 0.3)',
  },
  disabledSportTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sportText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  selectedSportTextFaded: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  disabledSportText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  backgroundTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backgroundTypeButton: {
    padding: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginRight: 8,
  },
  selectedBackgroundTypeButton: {
    borderColor: '#5771FE',
  },
  backgroundTypeText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  selectedBackgroundTypeText: {
    color: '#5771FE',
  },
  imageOptionsContainer: {
    marginBottom: 16,
  },
  imageOption: {
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  imageOptionPreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  imageSelectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSelectedIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  imageOptionText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
    marginTop: 8,
  },
  selectedImageOption: {
    borderColor: '#5771FE',
  },
}); 