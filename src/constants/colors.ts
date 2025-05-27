// Color Palette - Based on provided design reference
export const Colors = {
  // Primary brand colors - Based on the new palette
  primary: '#091343', // Dark navy blue (main brand color)
  primaryLight: '#5771FE', // Bright blue
  primaryMedium: '#87ABCC', // Light blue
  
  // Secondary colors from the palette
  secondary: '#7DD3B9', // Mint green
  accent: '#D59BF9', // Light purple
  tertiary: '#FB9EB4', // Pink
  quaternary: '#FADAAD', // Light yellow/cream
  
  // Light background colors from palette
  lightBlue: '#D7F0FC', // Very light blue
  lightPink: '#FDE8ED', // Very light pink  
  lightGreen: '#F2F9DA', // Very light green
  lightGray: '#ECECEC', // Light gray
  
  // Gradient definitions using new colors
  gradients: {
    primary: ['#091343', '#5771FE'], // Navy to bright blue
    secondary: ['#7DD3B9', '#87ABCC'], // Mint to light blue
    accent: ['#D59BF9', '#FB9EB4'], // Purple to pink
    warm: ['#FADAAD', '#FDE8ED'], // Cream to light pink
    background: ['#091343', '#87ABCC'], // Dark navy to light blue
    card: ['rgba(9, 19, 67, 0.1)', 'rgba(135, 171, 204, 0.1)'], // Glassmorphism
  },
  
  // Background colors
  background: {
    primary: '#091343', // Dark navy blue
    secondary: '#D7F0FC', // Very light blue
    tertiary: '#ECECEC', // Light gray
    card: 'rgba(9, 19, 67, 0.8)', // Semi-transparent navy
    modal: 'rgba(9, 19, 67, 0.95)', // Modal overlay
    blur: 'rgba(125, 211, 185, 0.05)', // Subtle mint tint
  },
  
  // Text colors
  text: {
    primary: '#091343', // Dark navy for main text
    secondary: '#87ABCC', // Light blue for secondary text
    tertiary: '#7DD3B9', // Mint green for accents
    muted: '#ECECEC', // Light gray for muted text
    inverse: '#FFFFFF', // White text for dark backgrounds
    accent: '#D59BF9', // Purple text for highlights
    link: '#5771FE', // Bright blue for links
  },
  
  // UI state colors
  status: {
    success: '#7DD3B9', // Mint green for success
    warning: '#FADAAD', // Light yellow for warnings
    error: '#FB9EB4', // Pink for errors
    info: '#5771FE', // Bright blue for info
  },
  
  // Border and divider colors
  border: {
    primary: '#87ABCC', // Light blue border
    secondary: '#ECECEC', // Light gray border
    accent: '#D59BF9', // Purple accent border
    focus: '#5771FE', // Bright blue focus border
    error: '#FB9EB4', // Pink error border
  },
  
  // Button colors
  button: {
    primary: '#5771FE', // Bright blue button
    primaryHover: '#091343', // Navy on hover
    secondary: '#7DD3B9', // Mint green button
    secondaryHover: '#87ABCC', // Light blue on hover
    ghost: 'transparent', // Transparent button
    disabled: '#ECECEC', // Light gray disabled state
  },
  
  // Input colors
  input: {
    background: '#D7F0FC', // Very light blue background
    border: '#87ABCC', // Light blue border
    focus: '#5771FE', // Bright blue focus
    placeholder: '#ECECEC', // Light gray placeholder
    error: '#FB9EB4', // Pink error state
  },
  
  // Tab bar colors
  tabBar: {
    background: 'rgba(9, 19, 67, 0.95)', // Navy with transparency
    active: '#5771FE', // Bright blue active
    inactive: '#87ABCC', // Light blue inactive
    border: '#D7F0FC', // Very light blue border
  },
  
  // Notification colors
  notification: {
    background: 'rgba(215, 240, 252, 0.95)', // Light blue background
    border: '#87ABCC', // Light blue border
    success: '#7DD3B9', // Mint green
    warning: '#FADAAD', // Light yellow
    error: '#FB9EB4', // Pink
    info: '#5771FE', // Bright blue
  },
  
  // Shadow colors
  shadow: {
    light: 'rgba(9, 19, 67, 0.1)', // Light navy shadow
    medium: 'rgba(9, 19, 67, 0.25)', // Medium navy shadow
    heavy: 'rgba(9, 19, 67, 0.5)', // Heavy navy shadow
    colored: 'rgba(87, 113, 254, 0.3)', // Bright blue shadow
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