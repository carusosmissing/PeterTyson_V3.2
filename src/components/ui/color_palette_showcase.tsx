import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

export interface ColorPaletteShowcaseProps {
  style?: any;
}

export const ColorPaletteShowcase: React.FC<ColorPaletteShowcaseProps> = ({ style }) => {
  const colorSamples = [
    { name: 'Primary (Navy)', color: Colors.primary, code: '#091343' },
    { name: 'Primary Light (Bright Blue)', color: Colors.primaryLight, code: '#5771FE' },
    { name: 'Primary Medium (Light Blue)', color: Colors.primaryMedium, code: '#87ABCC' },
    { name: 'Secondary (Mint Green)', color: Colors.secondary, code: '#7DD3B9' },
    { name: 'Accent (Light Purple)', color: Colors.accent, code: '#D59BF9' },
    { name: 'Tertiary (Pink)', color: Colors.tertiary, code: '#FB9EB4' },
    { name: 'Quaternary (Cream)', color: Colors.quaternary, code: '#FADAAD' },
    { name: 'Light Blue', color: Colors.lightBlue, code: '#D7F0FC' },
    { name: 'Light Pink', color: Colors.lightPink, code: '#FDE8ED' },
    { name: 'Light Green', color: Colors.lightGreen, code: '#F2F9DA' },
    { name: 'Light Gray', color: Colors.lightGray, code: '#ECECEC' },
  ];

  return (
    <ScrollView style={[styles.container, style]} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>New Color Palette</Text>
      <Text style={styles.subtitle}>Colors from your design reference</Text>
      
      <View style={styles.colorGrid}>
        {colorSamples.map((sample, index) => (
          <View key={index} style={styles.colorCard}>
            <View style={[styles.colorSwatch, { backgroundColor: sample.color }]} />
            <View style={styles.colorInfo}>
              <Text style={styles.colorName}>{sample.name}</Text>
              <Text style={styles.colorCode}>{sample.code}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.gradientSection}>
        <Text style={styles.sectionTitle}>Gradient Examples</Text>
        
        <View style={styles.gradientCard}>
          <Text style={styles.gradientLabel}>Primary Gradient</Text>
          <Text style={styles.gradientDescription}>Navy to Bright Blue</Text>
        </View>
        
        <View style={styles.gradientCard}>
          <Text style={styles.gradientLabel}>Secondary Gradient</Text>
          <Text style={styles.gradientDescription}>Mint to Light Blue</Text>
        </View>
        
        <View style={styles.gradientCard}>
          <Text style={styles.gradientLabel}>Accent Gradient</Text>
          <Text style={styles.gradientDescription}>Purple to Pink</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.semantic.screenPadding,
    backgroundColor: Colors.background.secondary,
  },
  title: {
    ...Typography.textStyles.h1,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.textStyles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  colorGrid: {
    gap: 16,
  },
  colorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.border.primary,
  },
  colorInfo: {
    flex: 1,
  },
  colorName: {
    ...Typography.textStyles.body,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  colorCode: {
    ...Typography.textStyles.caption,
    color: Colors.text.secondary,
    fontFamily: 'monospace',
  },
  gradientSection: {
    marginTop: 40,
  },
  sectionTitle: {
    ...Typography.textStyles.h2,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  gradientCard: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
  },
  gradientLabel: {
    ...Typography.textStyles.body,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  gradientDescription: {
    ...Typography.textStyles.body,
    color: Colors.text.secondary,
  },
}); 