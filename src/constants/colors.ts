// TruEXP Brand Colors - Extracted from reference materials
export const Colors = {
  // Primary brand colors - Purple/Blue gradient theme
  primary: '#8B5CF6', // Primary purple
  primaryDark: '#7C3AED', // Darker purple
  primaryLight: '#A78BFA', // Lighter purple
  secondary: '#3B82F6', // Primary blue
  secondaryDark: '#2563EB', // Darker blue
  secondaryLight: '#60A5FA', // Lighter blue
  
  // Accent colors
  accent: '#F59E0B', // Gold/Yellow accent
  accentDark: '#D97706',
  accentLight: '#FCD34D',
  
  // Gradient definitions
  gradients: {
    primary: ['#8B5CF6', '#3B82F6'], // Purple to blue
    primaryReverse: ['#3B82F6', '#8B5CF6'], // Blue to purple
    secondary: ['#7C3AED', '#2563EB'], // Darker gradient
    accent: ['#F59E0B', '#EF4444'], // Gold to red
    background: ['#1F2937', '#111827'], // Dark background gradient
    card: ['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)'], // Glassmorphism
  },
  
  // Background colors
  background: {
    primary: '#0F172A', // Very dark blue-gray
    secondary: '#1E293B', // Dark blue-gray
    tertiary: '#334155', // Medium blue-gray
    card: 'rgba(30, 41, 59, 0.8)', // Semi-transparent card background
    modal: 'rgba(15, 23, 42, 0.95)', // Modal overlay
    blur: 'rgba(139, 92, 246, 0.05)', // Subtle purple tint
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF', // Pure white
    secondary: '#E2E8F0', // Light gray
    tertiary: '#94A3B8', // Medium gray
    muted: '#64748B', // Darker gray
    inverse: '#0F172A', // Dark text for light backgrounds
    accent: '#8B5CF6', // Purple text
    link: '#60A5FA', // Blue link color
  },
  
  // UI state colors
  status: {
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6', // Blue
  },
  
  // Border and divider colors
  border: {
    primary: '#334155', // Medium gray
    secondary: '#475569', // Lighter gray
    accent: '#8B5CF6', // Purple border
    focus: '#60A5FA', // Blue focus border
    error: '#EF4444', // Red error border
  },
  
  // Button colors
  button: {
    primary: '#8B5CF6', // Purple button
    primaryHover: '#7C3AED', // Darker on hover
    secondary: '#334155', // Gray button
    secondaryHover: '#475569', // Lighter on hover
    ghost: 'transparent', // Transparent button
    disabled: '#64748B', // Disabled state
  },
  
  // Input colors
  input: {
    background: 'rgba(30, 41, 59, 0.8)', // Semi-transparent
    border: '#475569', // Gray border
    focus: '#8B5CF6', // Purple focus
    placeholder: '#94A3B8', // Gray placeholder
    error: '#EF4444', // Red error state
  },
  
  // Tab bar colors
  tabBar: {
    background: 'rgba(15, 23, 42, 0.95)', // Dark with transparency
    active: '#8B5CF6', // Purple active
    inactive: '#94A3B8', // Gray inactive
    border: '#334155', // Border color
  },
  
  // Notification colors
  notification: {
    background: 'rgba(30, 41, 59, 0.95)',
    border: '#475569',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.25)',
    heavy: 'rgba(0, 0, 0, 0.5)',
    colored: 'rgba(139, 92, 246, 0.3)', // Purple shadow
  },
};

// Utility functions for color manipulation
export const ColorUtils = {
  // Add alpha to hex color
  addAlpha: (hex: string, alpha: number): string => {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `${hex}${alphaHex}`;
  },
  
  // Create gradient string
  createGradient: (colors: string[], direction = '45deg'): string => {
    return `linear-gradient(${direction}, ${colors.join(', ')})`;
  },
  
  // Get glassmorphism background
  getGlassmorphism: (baseColor: string, opacity = 0.1): string => {
    return `rgba(${baseColor}, ${opacity})`;
  },
}; 