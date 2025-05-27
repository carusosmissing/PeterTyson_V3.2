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
import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType, PhotoQuality } from 'react-native-image-picker';
import { Colors, Typography, Design, DesignUtils, Spacing } from '../../constants';
import { Card } from './card';
import { Button } from './button';

export interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
  onError?: (error: string) => void;
  mediaType?: MediaType;
  quality?: PhotoQuality;
  maxWidth?: number;
  maxHeight?: number;
  allowsEditing?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  onError,
  mediaType = 'photo',
  quality = 0.8 as PhotoQuality,
  maxWidth = 1024,
  maxHeight = 1024,
  allowsEditing = true,
  style,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const imagePickerOptions = {
    mediaType,
    quality,
    maxWidth,
    maxHeight,
    allowsEditing,
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorMessage) {
      if (response.errorMessage && onError) {
        onError(response.errorMessage);
      }
      return;
    }

    if (response.assets && response.assets[0]) {
      const asset = response.assets[0];
      if (asset.uri) {
        onImageSelected(asset.uri);
      }
    }
  };

  const openCamera = () => {
    setModalVisible(false);
    
    launchCamera(imagePickerOptions, (response) => {
      handleImageResponse(response);
    });
  };

  const openGallery = () => {
    setModalVisible(false);
    
    launchImageLibrary(imagePickerOptions, (response) => {
      handleImageResponse(response);
    });
  };

  const showImagePicker = () => {
    setModalVisible(true);
  };

  const renderPickerModal = () => (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <Card variant="glassmorphism" style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Image</Text>
          <Text style={styles.modalSubtitle}>
            Choose how you'd like to add an image
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              title="📷 Camera"
              onPress={openCamera}
              variant="primary"
              size="lg"
              fullWidth
              style={styles.optionButton}
            />
            
            <Button
              title="🖼️ Gallery"
              onPress={openGallery}
              variant="secondary"
              size="lg"
              fullWidth
              style={styles.optionButton}
            />
            
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              variant="ghost"
              size="base"
              fullWidth
              style={styles.cancelButton}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );

  return (
    <View style={style}>
      <TouchableOpacity onPress={showImagePicker} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
      {renderPickerModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.background.modal,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    ...Typography.textStyles.h3,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    ...Typography.textStyles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  optionButton: {
    marginBottom: 0,
  },
  cancelButton: {
    marginTop: 8,
  },
}); 