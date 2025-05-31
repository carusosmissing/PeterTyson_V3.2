# TruEXP Component Library Documentation

## Overview

The TruEXP Component Library is a collection of reusable React Native components built with TypeScript, designed to match the TruEXP brand aesthetic with glassmorphism effects, gradient backgrounds, and consistent styling.

**Recent Major Addition**: The **TrustubCarousel** system with flippable cards, photo galleries, and QR code generation.

## Design System

### Colors
The color system is based on the TruEXP brand palette with purple/blue gradients:
- **Primary**: Purple (#8B5CF6) to Blue (#3B82F6) gradients
- **Backgrounds**: Dark themes with glassmorphism effects
- **Text**: High contrast white/gray hierarchy
- **Status**: Success, warning, error, and info colors

### Typography
- **Font Family**: System fonts with fallbacks
- **Scale**: Responsive sizing from 10px to 64px
- **Weights**: Complete range from thin (100) to black (900)
- **Semantic Styles**: Predefined styles for headings, body, buttons, etc.

### Spacing
- **Base Unit**: 4px grid system
- **Semantic Spacing**: Named spacing for components, screens, content
- **Layout Spacing**: Major layout elements and safe areas

### Design Tokens
- **Border Radius**: Consistent rounded corners
- **Shadows**: Elevation system with colored shadows
- **Gradients**: Brand gradients with proper coordinates
- **Glassmorphism**: Blur effects with transparency
- **Animations**: Duration and easing definitions

## Component Categories

### UI Components (`src/components/ui/`)

#### Button
A versatile button component with gradient support and multiple variants.

**Props:**
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  gradient?: boolean;
}
```

**Usage:**
```tsx
import { Button } from '../components';

<Button
  title="Sign In"
  onPress={handleSignIn}
  variant="primary"
  size="lg"
  fullWidth
  gradient
/>
```

**Variants:**
- `primary`: Gradient background (default)
- `secondary`: Gray background with border
- `ghost`: Transparent background
- `outline`: Transparent with colored border

#### InputField
A comprehensive input component with glassmorphism effects and validation states.

**Props:**
```typescript
interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  size?: 'sm' | 'base' | 'lg';
  variant?: 'default' | 'glassmorphism';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}
```

**Usage:**
```tsx
import { InputField } from '../components';

<InputField
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  variant="glassmorphism"
  leftIcon={<EmailIcon />}
  error={emailError}
/>
```

#### Card
A flexible card component with glassmorphism and gradient support.

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glassmorphism' | 'gradient' | 'blur';
  size?: 'sm' | 'base' | 'lg';
  shadow?: keyof typeof Design.shadows;
  borderRadius?: keyof typeof Design.borderRadius;
  gradientColors?: string[];
  blurIntensity?: number;
}
```

**Usage:**
```tsx
import { Card } from '../components';

<Card variant="glassmorphism" size="lg">
  <Text>Card content</Text>
</Card>
```

#### Badge
A notification badge component with count and status variants.

**Props:**
```typescript
interface BadgeProps {
  count?: number;
  text?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'base' | 'lg';
  dot?: boolean;
}
```

**Usage:**
```tsx
import { Badge } from '../components';

<Badge count={5} variant="error" size="sm" />
<Badge dot variant="success" />
```

#### LoadingSpinner
A loading indicator with overlay support.

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
}
```

**Usage:**
```tsx
import { LoadingSpinner } from '../components';

<LoadingSpinner 
  size="large" 
  text="Loading..." 
  overlay 
/>
```

#### TrustubCarousel
A carousel system for displaying interactive trustub cards with 3D flip animations and content management.

**Props:**
```typescript
interface TrustubCarouselProps {
  trustubs: TrustubData[];
}

interface TrustubData {
  id: string;
  stubNumber: string;
  year: string;
  artist: string;
  venue: string;
  image: any;
  notes: string;
}
```

**Usage:**
```tsx
import { TrustubCarousel } from '../components';

const trustubsData = [
  {
    id: '1',
    stubNumber: '#01236',
    year: '2024',
    artist: 'Kendrick Lamar',
    venue: 'The Forum',
    image: Trustubs.trustub1,
    notes: 'Amazing experience with backstage access...',
  },
  // ... more trustubs
];

<TrustubCarousel trustubs={trustubsData} />
```

**Key Features:**
- **Infinite Scroll**: Seamless looping with triple data arrays
- **Snap-to-Center**: Each card centers perfectly when scrolling
- **Responsive Sizing**: Cards adapt to 90% screen width
- **Performance Optimized**: Smooth 60fps scrolling with throttled events
- **Touch Interactions**: Tap to flip, swipe to navigate

#### FlippableCard (Sub-component of TrustubCarousel)
An advanced card component with 3D flip animations and complex interactive features.

**Features:**

**Front Side:**
- Full-screen trustub image background (Instagram-style)
- Transparent overlay with text shadows for readability
- Header section with stub number and year
- Centered artist and venue information
- Gradient logo positioned in bottom right

**Back Side:**
- **QR Code Section**: Generated using `react-native-qrcode-skia` with unique URLs
- **Photo Gallery**: 4-column grid with camera/gallery integration
- **Experience Notes**: Editable multi-line text input
- **Event Details**: Structured data display with clean table layout

**Photo Management:**
```typescript
// Camera integration
const handleCameraSelection = async () => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });
  // Handle result
};

// Gallery access
const handleGallerySelection = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });
  // Handle result
};
```

**State Management:**
```typescript
const [isFlipped, setIsFlipped] = useState(false);
const [experienceText, setExperienceText] = useState(trustub.notes);
const [eventPhotos, setEventPhotos] = useState<Array<any | {uri: string}>>([...]);
const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
const [modalVisible, setModalVisible] = useState(false);
```

**Animations:**
- **3D Flip**: 180° Y-axis rotation with spring physics
- **Spring Transitions**: Tension/friction tuning for smooth animations
- **Native Driver**: 60fps performance with hardware acceleration
- **Backface Visibility**: Proper front/back face handling

**Dependencies Required:**
- `expo-image-picker`: Camera and photo library access
- `react-native-qrcode-skia`: QR code generation with styling
- `react-native-svg`: Vector graphics support

### Layout Components (`src/components/layout/`)

#### Container
A screen container with gradient backgrounds and safe area support.

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'solid';
  gradientType?: keyof typeof Design.gradients;
  customGradient?: string[];
  safeArea?: boolean;
  padding?: boolean;
}
```

**Usage:**
```tsx
import { Container } from '../components';

<Container variant="gradient" gradientType="background" safeArea>
  <Text>Screen content</Text>
</Container>
```

### Navigation Components (`src/components/navigation/`)

#### HeaderBar
A navigation header with glassmorphism effects and icon support.

**Props:**
```typescript
interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'default' | 'glassmorphism' | 'transparent';
  showBorder?: boolean;
}
```

**Usage:**
```tsx
import { HeaderBar } from '../components';

<HeaderBar
  title="Home"
  leftIcon={<BackIcon />}
  rightIcon={<SearchIcon />}
  onLeftPress={goBack}
  onRightPress={openSearch}
  variant="glassmorphism"
/>
```

## Design Patterns

### Glassmorphism
Components support glassmorphism effects with blur and transparency:

```tsx
// Using glassmorphism variant
<Card variant="glassmorphism">
  <InputField variant="glassmorphism" />
</Card>

// Custom glassmorphism
const customStyle = DesignUtils.createGlassmorphism('heavy', 0.2);
```

### Gradients
Gradient backgrounds are available throughout the system:

```tsx
// Primary brand gradient
<Button variant="primary" gradient />

// Custom gradient
<Card variant="gradient" gradientColors={['#FF0000', '#0000FF']} />

// Container with gradient background
<Container variant="gradient" gradientType="primary" />
```

### Shadows and Elevation
Consistent shadow system for depth:

```tsx
// Using design system shadows
<Card shadow="lg" />

// Custom shadow
const shadowStyle = DesignUtils.createShadow('xl', Colors.shadow.colored);
```

## Styling Guidelines

### Consistent Spacing
Use the spacing system for consistent layouts:

```tsx
import { Spacing } from '../constants';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.semantic.screenPadding,
    marginBottom: Spacing.semantic.contentGap,
  },
});
```

### Typography
Use semantic text styles:

```tsx
import { Typography } from '../constants';

const styles = StyleSheet.create({
  title: Typography.textStyles.h1,
  body: Typography.textStyles.body,
  button: Typography.textStyles.button,
});
```

### Colors
Use the color system for consistency:

```tsx
import { Colors } from '../constants';

const styles = StyleSheet.create({
  text: {
    color: Colors.text.primary,
  },
  background: {
    backgroundColor: Colors.background.card,
  },
  border: {
    borderColor: Colors.border.primary,
  },
});
```

## Best Practices

### Component Composition
Build complex UIs by composing simple components:

```tsx
<Container variant="gradient">
  <HeaderBar title="Profile" variant="glassmorphism" />
  <Card variant="glassmorphism">
    <InputField label="Name" variant="glassmorphism" />
    <Button title="Save" variant="primary" fullWidth />
  </Card>
</Container>
```

### Responsive Design
Components adapt to different screen sizes:

```tsx
// Size variants
<Button size="sm" /> // Mobile
<Button size="lg" /> // Tablet
<Button size="xl" /> // Desktop
```

### Accessibility
Components include accessibility features:

```tsx
<Button
  title="Submit"
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the current form"
/>
```

### Performance
Optimize component usage:

```tsx
// Use memo for expensive components
const MemoizedCard = React.memo(Card);

// Avoid inline styles
const styles = StyleSheet.create({
  card: { /* styles */ },
});
```

## Customization

### Extending Components
Create custom variants by extending base components:

```tsx
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <Button
      {...props}
      style={[customStyles.button, props.style]}
    />
  );
};
```

### Theme Customization
Modify the design system for custom themes:

```tsx
// Custom color palette
const customColors = {
  ...Colors,
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
};
```

## Dependencies

The component library requires these packages:
- `expo-linear-gradient`: For gradient effects
- `expo-blur`: For blur/glassmorphism effects
- `react-native-svg`: For icon support (future)

## Future Enhancements

### Planned Components
- ~~Avatar with status indicators~~ Implemented in TrustubCarousel
- ~~QR code generation~~ Implemented in FlippableCard  
- ~~Photo gallery management~~ Implemented in FlippableCard
- ~~3D flip animations~~ Implemented in FlippableCard
- TrustubGrid (Alternative view for carousel)
- ShareSheet for trustub sharing
- Camera overlay with trustub frames
- Social integration components

### Planned Features
- Dark/light theme switching
- Animation presets
- Icon library integration
- Accessibility improvements
- Performance optimizations
- ~~Storybook documentation~~ → Component-specific README files

This component library now includes sophisticated interactive components that handle complex state management, 3D animations, camera integration, and rich media content. The TrustubCarousel represents a significant advancement in the component architecture, demonstrating how to build complex, performant, and user-friendly components in React Native. 

## New Interaction Patterns

### 3D Card Flipping
The TrustubCarousel introduces 3D card flipping as a core interaction pattern:

```tsx
const flipCard = () => {
  if (isFlipped) {
    Animated.spring(flipAnimation, {
      toValue: 0,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.spring(flipAnimation, {
      toValue: 180,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }
  setIsFlipped(!isFlipped);
};
```

### Photo Gallery Integration
Components now support integrated photo management:

```tsx
// Photo grid component
<View style={styles.photoGrid}>
  {eventPhotos.map((photo, photoIndex) => (
    <TouchableOpacity 
      key={photoIndex} 
      style={styles.photoContainer}
      onPress={() => openPhotoModal(photo)}
      onLongPress={() => removePhoto(photoIndex)}
    >
      <Image source={getPhotoSource(photo)} style={styles.eventPhoto} />
    </TouchableOpacity>
  ))}
  
  <TouchableOpacity style={styles.addPhotoButton} onPress={openImagePicker}>
    <Text style={styles.addPhotoText}>+</Text>
  </TouchableOpacity>
</View>
```

### QR Code Generation
Dynamic QR code generation with custom styling:

```tsx
<QRCode
  value={`https://truexp.app/trustub/${trustub.id}`}
  size={140}
  color="white"
  errorCorrectionLevel="M"
  shapeOptions={{
    shape: "circle",
    eyePatternShape: "rounded",
    gap: 1,
    eyePatternGap: 0,
  }}
  strokeWidth={0.9}
  pathStyle="fill"
/>
```

## Complex Component Patterns

### Infinite Scroll Implementation
```typescript
// Create infinite data by duplicating items
const infiniteData = [...trustubs, ...trustubs, ...trustubs];

// Handle infinite scroll jumps
if (index <= 1) {
  const middleIndex = index + trustubs.length;
  const newPosition = middleIndex * itemWidth - containerPadding;
  setTimeout(() => {
    scrollViewRef.current?.scrollTo({ x: newPosition, animated: false });
    setActiveIndex(middleIndex);
  }, 100);
}
```

### Modal Photo Viewing
```typescript
<Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={closePhotoModal}
>
  <View style={styles.modalOverlay}>
    <TouchableOpacity onPress={closePhotoModal}>
      <View style={styles.modalContent}>
        {selectedPhoto && (
          <Image source={getPhotoSource(selectedPhoto)} style={styles.modalPhoto} />
        )}
      </View>
    </TouchableOpacity>
  </View>
</Modal>
```

### Permission Handling Patterns
```typescript
const openImagePicker = () => {
  Alert.alert(
    'Add Photo',
    'Choose how you want to add a photo',
    [
      { text: 'Camera', onPress: () => handleCameraSelection() },
      { text: 'Photo Library', onPress: () => handleGallerySelection() },
      { text: 'Cancel', style: 'cancel' },
    ]
  );
};
```

### Planned Components
- ~~Avatar with status indicators~~ Implemented in TrustubCarousel
- ~~QR code generation~~ Implemented in FlippableCard  
- ~~Photo gallery management~~ Implemented in FlippableCard
- ~~3D flip animations~~ Implemented in FlippableCard
- TrustubGrid (Alternative view for carousel)
- ShareSheet for trustub sharing
- Camera overlay with trustub frames
- Social integration components

### Planned Features
- Dark/light theme switching
- Animation presets
- Icon library integration
- Accessibility improvements
- Performance optimizations
- ~~Storybook documentation~~ → Component-specific README files

This component library now includes sophisticated interactive components that handle complex state management, 3D animations, camera integration, and rich media content. The TrustubCarousel represents a significant advancement in the component architecture, demonstrating how to build complex, performant, and user-friendly components in React Native. 