// TruEXP Spacing System - Consistent spacing scale
export const Spacing = {
  // Base spacing unit (4px)
  base: 4,
  
  // Spacing scale - Based on 4px grid
  scale: {
    0: 0,
    1: 4,    // 0.25rem
    2: 8,    // 0.5rem
    3: 12,   // 0.75rem
    4: 16,   // 1rem
    5: 20,   // 1.25rem
    6: 24,   // 1.5rem
    8: 32,   // 2rem
    10: 40,  // 2.5rem
    12: 48,  // 3rem
    16: 64,  // 4rem
    20: 80,  // 5rem
    24: 96,  // 6rem
    32: 128, // 8rem
    40: 160, // 10rem
    48: 192, // 12rem
    56: 224, // 14rem
    64: 256, // 16rem
  },
  
  // Semantic spacing - Named spacing for specific use cases
  semantic: {
    // Component spacing
    componentPadding: 16,
    componentMargin: 12,
    componentGap: 8,
    
    // Screen spacing
    screenPadding: 20,
    screenMargin: 16,
    screenGap: 24,
    
    // Content spacing
    contentPadding: 16,
    contentMargin: 12,
    contentGap: 16,
    
    // Text spacing
    textMargin: 8,
    textGap: 4,
    paragraphGap: 16,
    
    // Button spacing
    buttonPadding: 16,
    buttonMargin: 8,
    buttonGap: 12,
    
    // Input spacing
    inputPadding: 12,
    inputMargin: 8,
    inputGap: 16,
    
    // Card spacing
    cardPadding: 20,
    cardMargin: 16,
    cardGap: 12,
    
    // List spacing
    listItemPadding: 16,
    listItemMargin: 4,
    listGap: 8,
    
    // Navigation spacing
    tabBarPadding: 12,
    headerPadding: 16,
    navGap: 8,
  },
  
  // Layout spacing - For major layout elements
  layout: {
    // Container spacing
    containerPadding: 20,
    containerMargin: 16,
    
    // Section spacing
    sectionPadding: 24,
    sectionMargin: 32,
    sectionGap: 40,
    
    // Grid spacing
    gridGap: 16,
    gridPadding: 12,
    
    // Modal spacing
    modalPadding: 24,
    modalMargin: 20,
    
    // Safe area spacing
    safeAreaTop: 44,
    safeAreaBottom: 34,
    
    // Tab bar height
    tabBarHeight: 80,
    headerHeight: 60,
  },
  
  // Border radius - Consistent rounded corners
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  
  // Shadow spacing - For elevation
  shadow: {
    offset: {
      sm: { width: 0, height: 1 },
      base: { width: 0, height: 2 },
      md: { width: 0, height: 4 },
      lg: { width: 0, height: 8 },
      xl: { width: 0, height: 12 },
      '2xl': { width: 0, height: 16 },
    },
    radius: {
      sm: 2,
      base: 4,
      md: 6,
      lg: 8,
      xl: 12,
      '2xl': 16,
    },
  },
};

// Spacing utilities
export const SpacingUtils = {
  // Get spacing value by key
  getSpacing: (key: keyof typeof Spacing.scale): number => {
    return Spacing.scale[key];
  },
  
  // Get semantic spacing
  getSemantic: (key: keyof typeof Spacing.semantic): number => {
    return Spacing.semantic[key];
  },
  
  // Get layout spacing
  getLayout: (key: keyof typeof Spacing.layout): number => {
    return Spacing.layout[key];
  },
  
  // Create padding object
  createPadding: (
    top?: number,
    right?: number,
    bottom?: number,
    left?: number
  ) => {
    if (top !== undefined && right === undefined) {
      // Single value - all sides
      return { padding: top };
    }
    if (top !== undefined && right !== undefined && bottom === undefined) {
      // Two values - vertical and horizontal
      return { paddingVertical: top, paddingHorizontal: right };
    }
    // Four values or specific sides
    return {
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
    };
  },
  
  // Create margin object
  createMargin: (
    top?: number,
    right?: number,
    bottom?: number,
    left?: number
  ) => {
    if (top !== undefined && right === undefined) {
      // Single value - all sides
      return { margin: top };
    }
    if (top !== undefined && right !== undefined && bottom === undefined) {
      // Two values - vertical and horizontal
      return { marginVertical: top, marginHorizontal: right };
    }
    // Four values or specific sides
    return {
      marginTop: top,
      marginRight: right,
      marginBottom: bottom,
      marginLeft: left,
    };
  },
  
  // Create border radius object
  createBorderRadius: (radius: keyof typeof Spacing.borderRadius) => {
    return { borderRadius: Spacing.borderRadius[radius] };
  },
  
  // Create shadow object
  createShadow: (
    size: keyof typeof Spacing.shadow.offset,
    color = 'rgba(0, 0, 0, 0.1)'
  ) => {
    return {
      shadowOffset: Spacing.shadow.offset[size],
      shadowRadius: Spacing.shadow.radius[size],
      shadowColor: color,
      shadowOpacity: 1,
      elevation: size === 'sm' ? 2 : size === 'base' ? 4 : size === 'md' ? 6 : 8,
    };
  },
};

export const Layout = {
  // Screen padding
  screenPadding: 16,
  screenPaddingHorizontal: 20,
  
  // Component spacing
  componentSpacing: 16,
  sectionSpacing: 24,
  
  // Button dimensions
  buttonHeight: 48,
  buttonRadius: 12,
  
  // Input dimensions
  inputHeight: 48,
  inputRadius: 8,
  
  // Card dimensions
  cardRadius: 12,
  cardPadding: 16,
  
  // Tab bar
  tabBarHeight: 80,
  
  // Header
  headerHeight: 60,
}; 