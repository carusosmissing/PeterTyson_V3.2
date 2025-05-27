import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';
import { Container, Button, Card, ColorPaletteShowcase } from '../../components';

export const ColorTestScreen: React.FC = () => {
  return (
    <Container variant="gradient" safeArea>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>New Color Palette Test</Text>
        <Text style={styles.subtitle}>All colors from your design reference</Text>

        {/* Color Palette Showcase */}
        <ColorPaletteShowcase style={styles.showcase} />

        {/* Button Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Examples</Text>
          
          <Button
            title="Primary Button"
            onPress={() => {}}
            variant="primary"
            style={styles.button}
          />
          
          <Button
            title="Secondary Button"
            onPress={() => {}}
            variant="secondary"
            style={styles.button}
          />
          
          <Button
            title="Ghost Button"
            onPress={() => {}}
            variant="ghost"
            style={styles.button}
          />
        </View>

        {/* Card Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Examples</Text>
          
          <Card variant="default" style={styles.card}>
            <Text style={styles.cardTitle}>Default Card</Text>
            <Text style={styles.cardText}>
              This card uses the new color palette with navy blue primary color and light backgrounds.
            </Text>
          </Card>
          
          <Card variant="glassmorphism" style={styles.card}>
            <Text style={styles.cardTitle}>Glassmorphism Card</Text>
            <Text style={styles.cardText}>
              This card has a glassmorphism effect with the updated color scheme.
            </Text>
          </Card>
        </View>

        {/* Status Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Colors</Text>
          
          <View style={[styles.statusCard, { backgroundColor: Colors.status.success }]}>
            <Text style={styles.statusText}>Success - Mint Green</Text>
          </View>
          
          <View style={[styles.statusCard, { backgroundColor: Colors.status.warning }]}>
            <Text style={styles.statusText}>Warning - Light Yellow</Text>
          </View>
          
          <View style={[styles.statusCard, { backgroundColor: Colors.status.error }]}>
            <Text style={styles.statusText}>Error - Pink</Text>
          </View>
          
          <View style={[styles.statusCard, { backgroundColor: Colors.status.info }]}>
            <Text style={styles.statusText}>Info - Bright Blue</Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.semantic.screenPadding,
  },
  title: {
    ...Typography.textStyles.h1,
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    ...Typography.textStyles.body,
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  showcase: {
    marginBottom: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    ...Typography.textStyles.h2,
    color: Colors.text.inverse,
    marginBottom: 20,
  },
  button: {
    marginBottom: 12,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    ...Typography.textStyles.h3,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  cardText: {
    ...Typography.textStyles.body,
    color: Colors.text.secondary,
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  statusText: {
    ...Typography.textStyles.body,
    color: Colors.text.primary,
    fontWeight: '600',
  },
}); 