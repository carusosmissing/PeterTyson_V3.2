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

// App Icons - Navigation and UI
export const Icons = {
  // Navigation icons
  home: require('../../assets/icons/home.png'),
  search: require('../../assets/icons/search.png'),
  profile: require('../../assets/icons/profile.png'),
  messages: require('../../assets/icons/messages.png'),
  events: require('../../assets/icons/events.png'),
  shrine: require('../../assets/icons/shrine.png'),
  
  // Action icons
  back: require('../../assets/icons/back.png'),
  close: require('../../assets/icons/close.png'),
  menu: require('../../assets/icons/menu.png'),
  settings: require('../../assets/icons/settings.png'),
  edit: require('../../assets/icons/edit.png'),
  camera: require('../../assets/icons/camera.png'),
  gallery: require('../../assets/icons/gallery.png'),
  
  // Social icons
  like: require('../../assets/icons/like.png'),
  share: require('../../assets/icons/share.png'),
  comment: require('../../assets/icons/comment.png'),
  follow: require('../../assets/icons/follow.png'),
  
  // Status icons
  verified: require('../../assets/icons/verified.png'),
  star: require('../../assets/icons/star.png'),
  crown: require('../../assets/icons/crown.png'),
  fire: require('../../assets/icons/fire.png'),
  
  // Music/Sports icons
  music: require('../../assets/icons/music.png'),
  sports: require('../../assets/icons/sports.png'),
  microphone: require('../../assets/icons/microphone.png'),
  trophy: require('../../assets/icons/trophy.png'),
};

// App Images - Backgrounds and illustrations
export const Images = {
  // Backgrounds
  welcomeBackground: require('../../assets/images/welcome-bg.png'),
  onboardingBackground: require('../../assets/images/onboarding-bg.png'),
  homeBackground: require('../../assets/images/home-bg.png'),
  
  // Illustrations
  musicIllustration: require('../../assets/images/music-illustration.png'),
  sportsIllustration: require('../../assets/images/sports-illustration.png'),
  emptyState: require('../../assets/images/empty-state.png'),
  errorState: require('../../assets/images/error-state.png'),
  
  // Logos
  logo: require('../../assets/images/truexp-logo.png'),
  logoWhite: require('../../assets/images/truexp-logo-white.png'),
  logoIcon: require('../../assets/images/truexp-icon.png'),
  
  // Placeholders
  avatarPlaceholder: require('../../assets/images/avatar-placeholder.png'),
  imagePlaceholder: require('../../assets/images/image-placeholder.png'),
  eventPlaceholder: require('../../assets/images/event-placeholder.png'),
};

// Avatar images for demo/testing
export const Avatars = {
  user1: require('../../assets/avatars/user1.png'),
  user2: require('../../assets/avatars/user2.png'),
  user3: require('../../assets/avatars/user3.png'),
  user4: require('../../assets/avatars/user4.png'),
  user5: require('../../assets/avatars/user5.png'),
};

// Event images for demo/testing
export const EventImages = {
  concert1: require('../../assets/events/concert1.jpg'),
  concert2: require('../../assets/events/concert2.jpg'),
  sports1: require('../../assets/events/sports1.jpg'),
  sports2: require('../../assets/events/sports2.jpg'),
  festival1: require('../../assets/events/festival1.jpg'),
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