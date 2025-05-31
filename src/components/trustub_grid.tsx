import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, Images } from '../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface TrustubData {
  id: string;
  stubNumber: string;
  year: string;
  artist: string;
  venue: string;
  image: any;
}

interface TrustubGridProps {
  trustubs: TrustubData[];
}

export const TrustubGrid: React.FC<TrustubGridProps> = ({ trustubs }) => {
  const renderTrustubItem = (trustub: TrustubData, index: number) => (
    <TouchableOpacity key={trustub.id} style={styles.gridItem}>
      <Image source={trustub.image} style={styles.trustubImage} />
      <View style={styles.overlay}>
        <Text style={styles.stubNumber}>{trustub.stubNumber}</Text>
        <Text style={styles.artistName}>{trustub.artist}</Text>
      </View>
      <View style={styles.logoOverlay}>
        <Image source={Images.logo} style={styles.logoImage} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.row}>
          {trustubs.slice(0, 2).map((trustub, index) => renderTrustubItem(trustub, index))}
        </View>
        <View style={styles.row}>
          {trustubs.slice(2, 4).map((trustub, index) => renderTrustubItem(trustub, index + 2))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
    paddingTop: 20,
    marginBottom: 90, // Space for navigation
  },
  grid: {
    flex: 1,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  gridItem: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    // Add shadow effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10, // For Android
  },
  trustubImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 15,
    left: 12,
  },
  stubNumber: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: Typography.fontFamily.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  artistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Typography.fontFamily.display,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  logoOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  logoImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
}); 