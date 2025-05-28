// TruEXP Design System - Main exports
import { Colors as OriginalColors, ColorUtils } from './colors';
import { Spacing } from './spacing';

// Create enhanced Colors object with both nested and flat properties
export const Colors = Object.assign(
  // Start with the original colors
  {},
  OriginalColors,
  // Add flat overrides for properties that screens expect as strings
  {
    background: OriginalColors.background.primary,
    text: OriginalColors.text.primary,
    border: OriginalColors.border.primary,
    textSecondary: OriginalColors.text.secondary,
    textMuted: OriginalColors.text.muted,
    buttonPrimary: OriginalColors.button.primary,
    buttonSecondary: OriginalColors.button.secondary,
    inputBorder: OriginalColors.input.border,
    inputBackground: OriginalColors.input.background,
    tabBarBackground: OriginalColors.tabBar.background,
    tabBarActive: OriginalColors.tabBar.active,
    tabBarInactive: OriginalColors.tabBar.inactive,
    // Maintain backward compatibility with old property names
    primaryDark: OriginalColors.primary, // Map old primaryDark to new primary
    primaryLight: OriginalColors.primaryLight,
    secondaryDark: OriginalColors.secondary, // Map old secondaryDark to new secondary
    secondaryLight: OriginalColors.primaryMedium, // Map old secondaryLight to new primaryMedium
    inputRadius: 8,
    inputHeight: 48,
    buttonHeight: 48,
    buttonRadius: 12,
    screenPaddingHorizontal: 20,
  }
);

export { ColorUtils } from './colors';
export { Typography, TypographyUtils } from './typography';
export { Spacing, SpacingUtils } from './spacing';
export { Design, DesignUtils } from './design';
export { Assets, Icons, Images, Avatars, EventImages, Badges, AssetUtils } from './assets';
export { Trustubs } from './assets';

// Enhanced Layout object with all needed properties
export const Layout = {
  ...Spacing,
  // Additional flat properties for backward compatibility
  screenPaddingHorizontal: 20,
  buttonHeight: 48,
  buttonRadius: 12,
  inputHeight: 48,
  inputRadius: 8,
}; 