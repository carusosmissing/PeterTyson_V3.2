// TruEXP Asset Management System
import { ImageSourcePropType } from 'react-native';

// Asset types for TypeScript
export interface AssetImage {
  uri?: string;
  source: ImageSourcePropType;
  width?: number;
  height?: number;
}

export interface AssetIcon {
  name: string;
  source: ImageSourcePropType;
  size?: number;
}

// App Icons - Navigation and UI (using actual TruEXP assets)
export const Icons = {
  // Navigation icons
  home: require('../../assets/ui_icons/white/home-white.png'),
  search: require('../../assets/ui_icons/white/search-white.png'),
  profile: require('../../assets/ui_icons/white/person-white.png'),
  messages: require('../../assets/ui_icons/white/message-white.png'),
  events: require('../../assets/ui_icons/white/ticket-white.png'),
  shrine: require('../../assets/ui_icons/white/star-white.png'),
  
  // Action icons
  back: require('../../assets/ui_icons/white/arrow-left-white.png'),
  close: require('../../assets/ui_icons/white/cross-white.png'),
  menu: require('../../assets/ui_icons/white/menu-white.png'),
  settings: require('../../assets/ui_icons/white/info-white.png'),
  edit: require('../../assets/ui_icons/white/plus-white.png'),
  camera: require('../../assets/ui_icons/white/eye-white.png'),
  gallery: require('../../assets/ui_icons/white/upload-white.png'),
  
  // Social icons
  like: require('../../assets/ui_icons/white/heart-white.png'),
  share: require('../../assets/ui_icons/white/upload-white.png'),
  comment: require('../../assets/ui_icons/white/message-white.png'),
  follow: require('../../assets/ui_icons/white/plus-white.png'),
  
  // Status icons
  verified: require('../../assets/ui_icons/white/checkmark-white.png'),
  star: require('../../assets/ui_icons/white/star-white.png'),
  crown: require('../../assets/ui_icons/white/prize-white.png'),
  fire: require('../../assets/ui_icons/white/bolt-white.png'),
  
  // Music/Sports icons
  music: require('../../assets/ui_icons/white/music-note-white.png'),
  sports: require('../../assets/ui_icons/white/basketball-white.png'),
  microphone: require('../../assets/ui_icons/white/speaker-white.png'),
  trophy: require('../../assets/ui_icons/white/prize-white.png'),
  
  // Additional navigation icons for The Pit
  pit: require('../../assets/ui_icons/white/bolt-white.png'),
  notification: require('../../assets/ui_icons/white/notification-white.png'),
};

// App Images - Backgrounds and illustrations (using actual TruEXP assets)
export const Images = {
  // Backgrounds
  welcomeBackground: require('../../assets/backgrounds/background-1.png'),
  onboardingBackground: require('../../assets/backgrounds/background-2.png'),
  homeBackground: require('../../assets/backgrounds/background-3.png'),
  
  // Logos
  logo: require('../../assets/logos/Logo-gradient.png'),
  logoWhite: require('../../assets/logos/Logo-white.png'),
  logoBlack: require('../../assets/logos/Logo-black.png'),
  logoIcon: require('../../assets/logos/Logo-gradient.png'),
  fullLogotypeWhite: require('../../assets/logos/full_logotype-white.png'),
  fullLogotypeBlack: require('../../assets/logos/full_logotype-black.png'),
  
  // Placeholders (using the one that exists)
  avatarPlaceholder: require('../../assets/avatars/pfp1.png'),
  imagePlaceholder: require('../../assets/backgrounds/background-1.png'),
  eventPlaceholder: require('../../assets/gallery_images/gallery-1.jpg'),
  
  // Additional backgrounds
  background1: require('../../assets/backgrounds/background-1.png'),
  background2: require('../../assets/backgrounds/background-2.png'),
  background3: require('../../assets/backgrounds/background-3.png'),
};

// Avatar images for demo/testing (using actual TruEXP assets)
export const Avatars = {
  user1: require('../../assets/avatars/pfp1.png'),
  user2: require('../../assets/avatars/pfp2.png'),
  user3: require('../../assets/avatars/pfp3.png'),
  user4: require('../../assets/avatars/pfp4.png'),
  user5: require('../../assets/avatars/pfp5.png'),
  pete: require('../../assets/avatars/pete_pfp.png'),
};

// Event images for demo/testing (using actual TruEXP assets)
export const EventImages = {
  gallery1: require('../../assets/gallery_images/gallery-1.jpg'),
  gallery2: require('../../assets/gallery_images/gallery-2.jpg'),
  // Aliases for backward compatibility
  concert1: require('../../assets/gallery_images/gallery-1.jpg'),
  concert2: require('../../assets/gallery_images/gallery-2.jpg'),
  sports1: require('../../assets/gallery_images/gallery-1.jpg'),
  sports2: require('../../assets/gallery_images/gallery-2.jpg'),
  festival1: require('../../assets/gallery_images/gallery-1.jpg'),
};

// Asset utility functions
export const AssetUtils = {
  // Get icon with fallback
  getIcon: (iconName: keyof typeof Icons, fallback?: ImageSourcePropType): ImageSourcePropType => {
    try {
      return Icons[iconName] || fallback || Icons.home;
    } catch (error) {
      console.warn(`Icon ${iconName} not found, using fallback`);
      return fallback || Icons.home;
    }
  },
  
  // Get image with fallback
  getImage: (imageName: keyof typeof Images, fallback?: ImageSourcePropType): ImageSourcePropType => {
    try {
      return Images[imageName] || fallback || Images.imagePlaceholder;
    } catch (error) {
      console.warn(`Image ${imageName} not found, using fallback`);
      return fallback || Images.imagePlaceholder;
    }
  },
  
  // Get avatar with fallback
  getAvatar: (avatarName: keyof typeof Avatars, fallback?: ImageSourcePropType): ImageSourcePropType => {
    try {
      return Avatars[avatarName] || fallback || Images.avatarPlaceholder;
    } catch (error) {
      console.warn(`Avatar ${avatarName} not found, using fallback`);
      return fallback || Images.avatarPlaceholder;
    }
  },
  
  // Create image source object
  createImageSource: (uri: string, width?: number, height?: number): AssetImage => {
    return {
      uri,
      source: { uri },
      width,
      height,
    };
  },
  
  // Validate image URI
  isValidImageUri: (uri: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => uri.toLowerCase().includes(ext)) || uri.startsWith('data:image');
  },
  
  // Get optimized image URI for different sizes
  getOptimizedImageUri: (baseUri: string, size: 'thumbnail' | 'medium' | 'large' = 'medium'): string => {
    if (!baseUri) return '';
    
    // If it's a Supabase storage URL, add size parameter
    if (baseUri.includes('supabase')) {
      const sizeParams = {
        thumbnail: '?width=150&height=150&resize=cover',
        medium: '?width=400&height=400&resize=cover',
        large: '?width=800&height=800&resize=cover',
      };
      return `${baseUri}${sizeParams[size]}`;
    }
    
    return baseUri;
  },
};

// Asset preloading for performance
export const preloadAssets = async (): Promise<void> => {
  try {
    const imageAssets = Object.values(Images);
    const iconAssets = Object.values(Icons);
    const avatarAssets = Object.values(Avatars);
    
    const allAssets = [...imageAssets, ...iconAssets, ...avatarAssets];
    
    // Preload critical assets
    const preloadPromises = allAssets.map(asset => {
      if (typeof asset === 'number') {
        // For require() assets, they're already bundled
        return Promise.resolve();
      }
      return Promise.resolve();
    });
    
    await Promise.all(preloadPromises);
    console.log('Assets preloaded successfully');
  } catch (error) {
    console.warn('Asset preloading failed:', error);
  }
};

// Export all assets
export const Assets = {
  Icons,
  Images,
  Avatars,
  EventImages,
  Utils: AssetUtils,
  preload: preloadAssets,
}; 