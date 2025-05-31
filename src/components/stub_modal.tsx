import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Animated, Dimensions } from 'react-native';
import { Images } from '../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface StubModalProps {
  visible: boolean;
  onClose: () => void;
  stub: {
    id: string;
    artist: string;
    subtitle?: string;
    image: any;
  } | null;
}

export const StubModal: React.FC<StubModalProps> = ({ visible, onClose, stub }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Pop-up entrance animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Start floating animation
      const floatingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 6,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: -6,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      floatingAnimation.start();

      return () => floatingAnimation.stop();
    } else {
      // Reset animations when not visible
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      floatAnim.setValue(0);
    }
  }, [visible, scaleAnim, fadeAnim, floatAnim]);

  const handleClose = () => {
    // Exit animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!stub) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.backdrop} onPress={handleClose} />
        
        <Animated.View style={[
          styles.modalContainer,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: floatAnim }
            ],
          }
        ]}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Stub image */}
          <View style={styles.stubContainer}>
            <Image source={stub.image} style={styles.stubImage} resizeMode="contain" />
            
            {/* Overlay content */}
            <View style={styles.stubOverlay}>
              <Text style={styles.stubId}>{stub.id}</Text>
              <Text style={styles.stubArtist}>{stub.artist}</Text>
              {stub.subtitle && (
                <Text style={styles.stubSubtitle}>{stub.subtitle}</Text>
              )}
            </View>

            {/* Logo overlay */}
            <View style={styles.logoOverlay}>
              <Image source={Images.logo} style={styles.logoImage} />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: screenWidth * 0.8,
    maxWidth: 350,
    height: screenHeight * 0.6,
    maxHeight: 500,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stubContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 20,
  },
  stubImage: {
    width: '100%',
    height: '100%',
  },
  stubOverlay: {
    position: 'absolute',
    top: 28,
    left: 26,
  },
  stubId: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Rubik',
  },
  stubArtist: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Rubik',
  },
  stubSubtitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFFFFF',
    marginTop: 4,
    fontFamily: 'Rubik',
  },
  logoOverlay: {
    position: 'absolute',
    bottom: 45,
    right: 16,
    zIndex: 10,
  },
  logoImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
}); 