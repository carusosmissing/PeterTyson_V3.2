import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Design, Spacing } from '../../constants';

export interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  animated?: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = Design.borderRadius.sm,
  style,
  animated = true,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue, animated]);

  const backgroundColor = animated
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.background.tertiary, Colors.background.card],
      })
    : Colors.background.tertiary;

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonText: React.FC<{ lines?: number; style?: ViewStyle }> = ({
  lines = 1,
  style,
}) => (
  <View style={style}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLoader
        key={index}
        height={16}
        width={index === lines - 1 ? '70%' : '100%'}
        style={{ marginBottom: index < lines - 1 ? 8 : 0 }}
      />
    ))}
  </View>
);

export const SkeletonAvatar: React.FC<{ size?: number; style?: ViewStyle }> = ({
  size = 40,
  style,
}) => (
  <SkeletonLoader
    width={size}
    height={size}
    borderRadius={size / 2}
    style={style}
  />
);

export const SkeletonCard: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.cardContainer, style]}>
    <View style={styles.cardHeader}>
      <SkeletonAvatar size={40} />
      <View style={styles.cardHeaderText}>
        <SkeletonLoader height={16} width="60%" />
        <SkeletonLoader height={12} width="40%" style={{ marginTop: 4 }} />
      </View>
    </View>
    <SkeletonLoader height={200} style={{ marginVertical: 12 }} />
    <SkeletonText lines={2} />
  </View>
);

export const SkeletonList: React.FC<{
  itemCount?: number;
  itemHeight?: number;
  style?: ViewStyle;
}> = ({ itemCount = 5, itemHeight = 60, style }) => (
  <View style={style}>
    {Array.from({ length: itemCount }).map((_, index) => (
      <View key={index} style={[styles.listItem, { height: itemHeight }]}>
        <SkeletonAvatar size={40} />
        <View style={styles.listItemContent}>
          <SkeletonLoader height={16} width="70%" />
          <SkeletonLoader height={12} width="50%" style={{ marginTop: 4 }} />
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    padding: Spacing.semantic.cardPadding,
    backgroundColor: Colors.background.card,
    borderRadius: Design.borderRadius.card,
    marginBottom: Spacing.semantic.cardMargin,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.semantic.listItemPadding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.primary,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },
}); 