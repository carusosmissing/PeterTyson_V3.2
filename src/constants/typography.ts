// TruEXP Typography System - Based on brand guidelines
export const Typography = {
  // Font families - TruEXP brand fonts
  fontFamily: {
    primary: 'System', // Primary system font
    secondary: 'System', // Secondary font
    mono: 'Menlo', // Monospace font
    display: 'System', // Display font for headers
  },
  
  // Font sizes - Responsive scale
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
    '7xl': 64,
  },
  
  // Line heights - Optimized for readability
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Font weights - Complete range
  fontWeight: {
    thin: '100' as const,
    extralight: '200' as const,
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
  
  // Text styles - Semantic text styles for consistent usage
  textStyles: {
    // Display styles
    display: {
      fontSize: 48,
      fontWeight: '700' as const,
      lineHeight: 1.1,
      letterSpacing: -0.5,
    },
    
    // Heading styles
    h1: {
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 1.2,
      letterSpacing: -0.25,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 1.2,
      letterSpacing: -0.25,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 20,
      fontWeight: '500' as const,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    
    // Body text styles
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.6,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    
    // UI text styles
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.2,
      letterSpacing: 0.25,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 1.2,
      letterSpacing: 0.25,
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 1.2,
      letterSpacing: 0.25,
    },
    
    // Input styles
    input: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    inputHelper: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    
    // Navigation styles
    tabLabel: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 1.2,
    },
    navTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    
    // Utility styles
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.3,
    },
    overline: {
      fontSize: 10,
      fontWeight: '600' as const,
      lineHeight: 1.2,
      letterSpacing: 1,
      textTransform: 'uppercase' as const,
    },
    link: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 1.4,
      textDecorationLine: 'underline' as const,
    },
    
    // Special styles
    hero: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 1.1,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    label: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 1.4,
      letterSpacing: 0.25,
    },
    badge: {
      fontSize: 12,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
  },
};

// Typography utilities
export const TypographyUtils = {
  // Get text style with custom overrides
  getTextStyle: (baseStyle: keyof typeof Typography.textStyles, overrides?: any) => {
    return {
      ...Typography.textStyles[baseStyle],
      ...overrides,
    };
  },
  
  // Create responsive font size
  getResponsiveFontSize: (baseSize: number, scale = 1.2) => {
    return {
      fontSize: baseSize,
      // Add responsive logic here if needed
    };
  },
  
  // Get font family with fallbacks
  getFontFamily: (family: keyof typeof Typography.fontFamily) => {
    const fontMap = {
      primary: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Menlo, Monaco, "Courier New", monospace',
      display: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    };
    return fontMap[family];
  },
}; 