// TruEXP Design System - Visual effects and design tokens
import { Colors } from './colors';
import { Spacing } from './spacing';

export const Design = {
  // Border radius definitions
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
    
    // Component-specific radius
    button: 12,
    input: 8,
    card: 16,
    modal: 20,
    avatar: 9999,
    badge: 12,
  },
  
  // Shadow definitions - Elevation system
  shadows: {
    none: {
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
    xs: {
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      shadowColor: Colors.shadow.light,
      shadowOpacity: 1,
      elevation: 1,
    },
    sm: {
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowColor: Colors.shadow.light,
      shadowOpacity: 1,
      elevation: 2,
    },
    base: {
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      shadowColor: Colors.shadow.medium,
      shadowOpacity: 1,
      elevation: 4,
    },
    md: {
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 8,
      shadowColor: Colors.shadow.medium,
      shadowOpacity: 1,
      elevation: 6,
    },
    lg: {
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 12,
      shadowColor: Colors.shadow.medium,
      shadowOpacity: 1,
      elevation: 8,
    },
    xl: {
      shadowOffset: { width: 0, height: 12 },
      shadowRadius: 16,
      shadowColor: Colors.shadow.heavy,
      shadowOpacity: 1,
      elevation: 12,
    },
    colored: {
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      shadowColor: Colors.shadow.colored,
      shadowOpacity: 1,
      elevation: 6,
    },
  },
  
  // Gradient definitions
  gradients: {
    // Primary brand gradients
    primary: {
      colors: Colors.gradients.primary,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    primaryVertical: {
      colors: Colors.gradients.primary,
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    primaryHorizontal: {
      colors: Colors.gradients.primary,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
    
    // Secondary gradients
    secondary: {
      colors: Colors.gradients.secondary,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    
    // Background gradients
    background: {
      colors: Colors.gradients.background,
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    
    // Accent gradients
    accent: {
      colors: Colors.gradients.accent,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    
    // Card gradients (glassmorphism)
    card: {
      colors: Colors.gradients.card,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  },
  
  // Glassmorphism effects
  glassmorphism: {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
    },
    medium: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(15px)',
    },
    heavy: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(20px)',
    },
    dark: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
    },
    colored: {
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(139, 92, 246, 0.2)',
      backdropFilter: 'blur(15px)',
    },
  },
  
  // Blur effects
  blur: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 40,
    '3xl': 64,
  },
  
  // Opacity levels
  opacity: {
    0: 0,
    5: 0.05,
    10: 0.1,
    20: 0.2,
    25: 0.25,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    75: 0.75,
    80: 0.8,
    90: 0.9,
    95: 0.95,
    100: 1,
  },
  
  // Animation durations
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
    slowest: 750,
  },
  
  // Transition easing
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Component dimensions
  dimensions: {
    // Button dimensions
    button: {
      height: {
        sm: 32,
        base: 44,
        lg: 52,
        xl: 60,
      },
      minWidth: {
        sm: 64,
        base: 88,
        lg: 120,
        xl: 160,
      },
    },
    
    // Input dimensions
    input: {
      height: {
        sm: 36,
        base: 44,
        lg: 52,
      },
      minWidth: 200,
    },
    
    // Avatar dimensions
    avatar: {
      xs: 24,
      sm: 32,
      base: 40,
      lg: 48,
      xl: 64,
      '2xl': 80,
      '3xl': 96,
    },
    
    // Icon dimensions
    icon: {
      xs: 12,
      sm: 16,
      base: 20,
      lg: 24,
      xl: 32,
      '2xl': 40,
    },
    
    // Badge dimensions
    badge: {
      height: 20,
      minWidth: 20,
      padding: 4,
    },
    
    // Tab bar dimensions
    tabBar: {
      height: 80,
      iconSize: 24,
      labelHeight: 16,
    },
    
    // Header dimensions
    header: {
      height: 60,
      iconSize: 24,
      titleHeight: 24,
    },
  },
};

// Design utilities
export const DesignUtils = {
  // Create glassmorphism style
  createGlassmorphism: (
    variant: keyof typeof Design.glassmorphism = 'medium',
    customOpacity?: number
  ) => {
    const base = Design.glassmorphism[variant];
    return {
      ...base,
      backgroundColor: customOpacity 
        ? `rgba(255, 255, 255, ${customOpacity})`
        : base.backgroundColor,
    };
  },
  
  // Create shadow style
  createShadow: (
    size: keyof typeof Design.shadows,
    customColor?: string
  ) => {
    const shadow = Design.shadows[size];
    return {
      ...shadow,
      shadowColor: customColor || shadow.shadowColor,
    };
  },
  
  // Create gradient style (for LinearGradient component)
  createGradient: (
    type: keyof typeof Design.gradients,
    customColors?: string[]
  ) => {
    const gradient = Design.gradients[type];
    return {
      colors: customColors || gradient.colors,
      start: gradient.start,
      end: gradient.end,
    };
  },
  
  // Create border radius style
  createBorderRadius: (
    size: keyof typeof Design.borderRadius,
    sides?: ('top' | 'bottom' | 'left' | 'right')[]
  ) => {
    const radius = Design.borderRadius[size];
    
    if (!sides) {
      return { borderRadius: radius };
    }
    
    const style: any = {};
    if (sides.includes('top')) {
      style.borderTopLeftRadius = radius;
      style.borderTopRightRadius = radius;
    }
    if (sides.includes('bottom')) {
      style.borderBottomLeftRadius = radius;
      style.borderBottomRightRadius = radius;
    }
    if (sides.includes('left')) {
      style.borderTopLeftRadius = radius;
      style.borderBottomLeftRadius = radius;
    }
    if (sides.includes('right')) {
      style.borderTopRightRadius = radius;
      style.borderBottomRightRadius = radius;
    }
    
    return style;
  },
  
  // Create opacity style
  createOpacity: (level: keyof typeof Design.opacity) => {
    return { opacity: Design.opacity[level] };
  },
  
  // Create animation style
  createAnimation: (
    duration: keyof typeof Design.animation,
    easing: keyof typeof Design.easing = 'easeInOut'
  ) => {
    return {
      duration: Design.animation[duration],
      easing: Design.easing[easing],
    };
  },
}; 