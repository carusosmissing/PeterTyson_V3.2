# TruEXP Component Library Documentation

## Overview

The TruEXP Component Library is a comprehensive collection of reusable React Native components built with TypeScript, designed to match the TruEXP brand aesthetic with glassmorphism effects, gradient backgrounds, and consistent styling.

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
- Avatar with status indicators
- Toggle switches and radio buttons
- Modal and bottom sheet components
- Tab bar with custom styling
- Message bubbles for chat
- Event and user cards
- Search components
- Form validation components

### Planned Features
- Dark/light theme switching
- Animation presets
- Icon library integration
- Accessibility improvements
- Performance optimizations
- Storybook documentation

This component library provides a solid foundation for building the TruEXP app with consistent, beautiful, and performant components that match the brand aesthetic. 