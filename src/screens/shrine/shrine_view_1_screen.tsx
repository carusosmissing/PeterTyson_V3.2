import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Layout } from '../../constants';

export const ShrineView1Screen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shrine View 1</Text>
      <Text style={styles.subtitle}>Shrine experience coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPaddingHorizontal,
  },
  title: {
    ...Typography.textStyles.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    ...Typography.textStyles.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
