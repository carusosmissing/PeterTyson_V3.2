# Shrine Carousel Implementation

## Overview
The shrine page features an advanced **flippable trustub carousel** that displays ticket stubs with interactive front and back sides. Each card is a complex interactive component with multiple features including photo galleries, QR codes, and editable experiences.

## What Was Implemented

### 1. TrustubCarousel Component (`src/components/trustub_carousel.tsx`)
A maybe too complex? carousel system with the following major components:

#### **FlippableCard Sub-Component**
- **3D Flip Animation**: Cards smoothly rotate 180° when tapped using React Native Animated
- **Front Side**: Traditional trustub display with full-image background
- **Back Side**: Interactive experience tracking with multiple sections
- **State Management**: Each card maintains its own flip state, photo gallery, and notes

#### **Infinite Scroll System**
- **Triple Data Array**: Creates seamless infinite scrolling by duplicating trustub arrays
- **Smart Position Tracking**: Automatically jumps between data sets to maintain infinite feel
- **Snap-to-Center**: Each card centers perfectly when scrolling stops
- **Responsive Sizing**: Cards adapt to 90% screen width with proper spacing

### 2. Front Side Features
#### **Visual Design**
- **Full-screen trustub image** as background (Instagram-style portrait)
- **Transparent overlay** with text directly on image
- **Text shadows** for readability over any image
- **Gradient logo** positioned in bottom right corner
- **Header with stub number and year**
- **Centered artist and venue information**

#### **Styling Elements**
- **Rounded corners** (20px border radius)
- **Drop shadows** for depth and elevation
- **Portrait aspect ratio** optimized for mobile viewing
- **Responsive typography** that adapts to different screen sizes

### 3. Back Side Features (The Complex Part!)

#### **QR Code Section**
- **Custom QR Code**: Generated using `react-native-qrcode-skia`
- **Unique URL**: `https://truexp.app/trustub/{id}` for each trustub
- **Styled Design**: White QR code with circular elements and rounded corners
- **Centered positioning** at top of back side

#### **Photo Gallery System**
- **Grid Layout**: 4 photos per row with responsive sizing
- **Add Photo Functionality**:
  - **Camera Integration**: Launch camera to take new photos
  - **Gallery Access**: Select from photo library
  - **Permission Handling**: Requests and manages camera/gallery permissions
  - **Image Processing**: Automatic square cropping and quality optimization
- **Photo Management**:
  - **Tap to View**: Opens photos in full-screen modal
  - **Long Press to Delete**: Remove unwanted photos with confirmation
  - **Mixed Sources**: Handles both asset images and camera/gallery photos
- **Add Button**: Dashed border button for adding new photos

#### **Experience Notes**
- **Editable Text Input**: Multi-line text field for personal experiences
- **Persistent Storage**: Notes are maintained in component state
- **Placeholder Text**: "Share your experience..." guidance
- **Character Limitations**: Scrollable input with height constraints
- **Real-time Updates**: Changes are immediately reflected

#### **Event Details Section**
- **Structured Data Display**: Artist, venue, year, and stub number
- **Clean Table Layout**: Label-value pairs with divider lines
- **Typography Hierarchy**: Different font weights and colors for readability
- **Consistent Styling**: Matches overall app design system

#### **Photo Modal System**
- **Full-Screen Overlay**: Black transparent background
- **Gesture Dismissal**: Tap anywhere to close
- **Smooth Animations**: Fade in/out transitions
- **Responsive Sizing**: Photos scale to fit screen while maintaining aspect ratio
- **Close Button**: Positioned top-right with visual styling

### 4. Updated Shrine Screen (`src/screens/main/the_shrine_screen.tsx`)

#### **View Toggle System**
- **Carousel/Grid Toggle**: Button to switch between viewing modes
- **State Management**: Persistent view type selection
- **Visual Feedback**: Button shows current mode

#### **Enhanced Header**
- **Profile Integration**: User avatar with navigation to profile
- **Notifications**: Badge counter with navigation
- **Menu Access**: Hamburger menu for settings
- **Clean Typography**: "My Shrine" title

#### **Trustub Data Structure**
Enhanced data objects with:
- **Unique IDs**: For proper key handling in infinite scroll
- **Image Assets**: References to trustub images
- **Rich Notes**: Detailed backstory for each event
- **Complete Metadata**: Stub numbers, venues, years, artists

## Technical Implementation Details

### **Dependencies & Libraries**
- **React Native Animated**: 3D flip animations and transitions
- **expo-image-picker**: Camera and photo library access
- **react-native-qrcode-skia**: QR code generation with styling
- **React Hooks**: useState, useRef, useEffect for state management
- **Dimensions API**: Responsive sizing calculations

### **Performance Optimizations**
- **Infinite Scroll Logic**: Smart array management prevents memory issues
- **Image Optimization**: Automatic quality reduction and caching
- **Event Throttling**: Scroll events throttled to 16ms for smooth performance
- **Lazy Loading**: Photos and QR codes only render when needed

### **State Management Architecture**
```typescript
// Per-card state management
const [isFlipped, setIsFlipped] = useState(false);
const [experienceText, setExperienceText] = useState(trustub.notes);
const [eventPhotos, setEventPhotos] = useState<Array<any | {uri: string}>>([...]);
const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
const [modalVisible, setModalVisible] = useState(false);
```

### **Animation System**
- **Flip Animation**: 180° Y-axis rotation with spring physics
- **Front/Back Transforms**: Proper backface visibility handling
- **Smooth Transitions**: Spring animations with tension/friction tuning
- **Performance**: Uses native driver for 60fps animations

### **Responsive Design System**
```typescript
const CARD_WIDTH = screenWidth * 0.9; // 90% screen width
const CARD_HEIGHT = screenHeight * 0.75; // 75% screen height
const CARD_SPACING = screenWidth * 0.2; // Responsive spacing
```

## User Interaction Flows

### **Basic Navigation**
1. **Horizontal Swiping**: Navigate between trustubs
2. **Card Tapping**: Flip to back side for details
3. **Photo Tapping**: View full-size in modal
4. **Toggle Button**: Switch between carousel and grid views

### **Photo Management Flow**
1. **Add Photo**: Tap + button → Choose camera/gallery → Take/select photo → Auto-add to gallery
2. **View Photo**: Tap thumbnail → Open full-screen modal → Tap anywhere to close
3. **Delete Photo**: Long press thumbnail → Confirm deletion → Remove from gallery

### **Experience Editing**
1. **Flip to Back**: Tap card front
2. **Edit Notes**: Tap text input → Type experience → Changes save automatically
3. **Add Photos**: Use photo gallery system
4. **Share via QR**: QR code provides shareable link

## Files Modified/Created
1. **`src/components/trustub_carousel.tsx`** - Complete rewrite with flipping functionality
2. **`src/components/index.ts`** - Updated exports
3. **`src/screens/main/the_shrine_screen.tsx`** - Added toggle and enhanced header
4. **Added dependencies**: expo-image-picker, react-native-qrcode-skia
5. **Enhanced trustub data** with detailed notes and metadata

## Current Functionality Status
The implementation includes:
- ✅ **3D Card Flipping** with smooth animations
- ✅ **Photo Gallery** with camera/library integration
- ✅ **QR Code Generation** with custom styling
- ✅ **Editable Experience Notes** with persistence
- ✅ **Full-Screen Photo Modal** with gesture dismissal
- ✅ **Infinite Scroll Carousel** with snap-to-center
- ✅ **Event Details Display** with structured data
- ✅ **Permission Handling** for camera/gallery access
- ✅ **Responsive Design** across different screen sizes
- ✅ **Grid/Carousel Toggle** for different viewing modes

## Development Notes for Handoff

### **Key Code Locations**
- **Flip Animation Logic**: Lines 162-201 in trustub_carousel.tsx
- **Photo Management**: Lines 56-150 in trustub_carousel.tsx  
- **QR Code Rendering**: Lines 260-275 in trustub_carousel.tsx
- **Infinite Scroll Logic**: Lines 389-428 in trustub_carousel.tsx

### **Performance Considerations**
- Photo arrays can grow large - consider implementing pagination or cleanup
- Infinite scroll creates 3x data arrays - monitor memory usage with large datasets

### **Potential Enhancements**
- **Analytics**: Track which trustubs get most interaction
- **Trustub & Photo Sharing**: Allow users to share individual trustubs and gallery photos via social media, messaging, or direct links
- **Public/Private Gallery Toggle**: Give users control over which photos in their gallery are public vs private when sharing trustubs

The carousel is now a comprehensive experience management system rather than just a display component. Each card is essentially a mini-app for documenting and sharing concert experiences! 