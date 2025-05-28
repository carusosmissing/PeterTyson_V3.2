import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ViewStyle,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
  onError?: (error: string) => void;
  maxWidth?: number;
  maxHeight?: number;
  allowsEditing?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
  quality?: number;
}

export const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  onImageSelected,
  onError,
  maxWidth = 1024,
  maxHeight = 1024,
  allowsEditing = true,
  style,
  children,
  quality = 0.8,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    console.log('📱 Modal visibility changed:', modalVisible);
  }, [modalVisible]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to upload photos!'
      );
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera permissions to take photos!'
      );
      return false;
    }
    return true;
  };

  const openCamera = async () => {
    console.log('📷 Camera option selected');
    setModalVisible(false);
    
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    try {
      console.log('📷 Launching camera...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing,
        aspect: [1, 1],
        quality,
        exif: false,
      });

      console.log('📷 Camera result:', result);
      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('📷 Image selected:', result.assets[0].uri);
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      if (onError) {
        onError('Failed to take photo');
      }
    }
  };

  const openGallery = async () => {
    console.log('🖼️ Gallery option selected');
    setModalVisible(false);
    
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      console.log('🖼️ Launching gallery...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing,
        aspect: [1, 1],
        quality,
        exif: false,
      });

      console.log('🖼️ Gallery result:', result);
      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('🖼️ Image selected:', result.assets[0].uri);
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      if (onError) {
        onError('Failed to select image');
      }
    }
  };

  const showImagePicker = () => {
    console.log('🔥 Upload button clicked - showing modal');
    Alert.alert('Debug', 'Button clicked!');
    setModalVisible(true);
  };

  const renderPickerModal = () => {
    if (modalVisible) {
      console.log('🎬 Modal is rendering...');
    }
    
    return (
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Image</Text>
            <Text style={styles.modalSubtitle}>
              Choose how you'd like to add an image
            </Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openCamera}
              >
                <Text style={styles.modalButtonText}>📷 Camera</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openGallery}
              >
                <Text style={styles.modalButtonText}>🖼️ Gallery</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelModalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={showImagePicker} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
      {renderPickerModal()}
    </View>
  );
};

// Export with the old name for backward compatibility
export { ImagePickerComponent as ImagePicker };

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  modalButton: {
    padding: 16,
    backgroundColor: '#5771FE',
    borderRadius: 8,
    marginBottom: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  cancelModalButton: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
  },
  cancelModalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
}); 