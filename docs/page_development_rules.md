# Page Development Rules

## Background Images

When creating new pages or screens in this application, you must follow these background image rules:

### Available Background Images
The app provides multiple background options located in the `assets/backgrounds/` folder:

#### Main Background Options:
1. **bg-4.png** - Available as `Images.background1` - Dark gradient background
2. **bg-6.png** - Available as `Images.background2` - Purple/blue gradient 
3. **bg-7.png** - Available as `Images.background3` - Blue/teal gradient

#### Specific Screen Backgrounds:
- **Welcome/Landing**: `Images.welcomeBackground` (bg-4.png)
- **Welcome Screen**: `Images.welcomeScreenBackground` (bg-8.png)
- **Onboarding**: `Images.onboardingBackground` (bg-4.png)
- **Music/Sports Selection**: `Images.musicOrSportsBackground` (bg-8.png)
- **Home Screen**: `Images.homeBackground` (background-3.png)
- **Additional Options**: `Images.bg6Background`, `Images.bg7Background`

### How to Apply Background Images
Use the Container component with the `image` variant:

```tsx
import { Images } from '../../constants';
import { Container } from '../../components';

// Example usage with main backgrounds
<Container variant="image" backgroundImage={Images.background2} safeArea>
  {/* Your page content */}
</Container>

// Example usage with specific screen backgrounds
<Container variant="image" backgroundImage={Images.welcomeScreenBackground} safeArea>
  {/* Your page content */}
</Container>
```

### Background Image Selection Guidelines
- **Images.background1** (bg-4.png): Use for welcome/landing screens and dark theme pages
- **Images.background2** (bg-6.png): Use for main app screens with purple/blue theme
- **Images.background3** (bg-7.png): Use for secondary/detail screens with blue/teal theme
- **Specific backgrounds**: Use the dedicated screen backgrounds for their intended purposes

## Typography & Font Usage

### Rubik Font Family - REQUIRED
**ALL text in the application MUST use the Rubik font family.** The app uses Rubik as the primary brand font.

#### Available Rubik Font Weights:
- `Typography.fontFamily.primary` - 'Rubik-Regular' (400)
- `Typography.fontFamily.secondary` - 'Rubik-Medium' (500)  
- `Typography.fontFamily.display` - 'Rubik-Bold' (700)

#### How to Apply Rubik Fonts
Always import Typography from constants and use the predefined font families:

```tsx
import { Typography } from '../../constants';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.inverse,
    fontFamily: Typography.fontFamily.display, // Rubik-Bold
  },
  bodyText: {
    fontSize: 16,
    color: Colors.text.inverse,
    fontFamily: Typography.fontFamily.primary, // Rubik-Regular
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.muted,
    fontFamily: Typography.fontFamily.secondary, // Rubik-Medium
  },
});
```

#### Alternative Simple Approach
If you prefer the simpler approach, you can directly use:

```tsx
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rubik', // This will use the loaded Rubik font
  },
});
```

### Typography Guidelines
- **Headers/Titles**: Use `Typography.fontFamily.display` (Rubik-Bold)
- **Body Text**: Use `Typography.fontFamily.primary` (Rubik-Regular)
- **Emphasis Text**: Use `Typography.fontFamily.secondary` (Rubik-Medium)
- **Never use system fonts** - Always use Rubik variants

## Font Colors

### White Color Usage
For all text that needs to be white, use one of the white colors defined in `src/constants/colors.ts`:

#### Available White Colors:
- `Colors.text.inverse` - Pure white (`#FFFFFF`) - **Primary choice for white text**
- `Colors.text.muted` - Light gray (`#ECECEC`) - For muted/secondary white text

### How to Apply White Colors
```tsx
import { Colors, Typography } from '../../constants';

const styles = StyleSheet.create({
  whiteText: {
    color: Colors.text.inverse, // Pure white
    fontFamily: Typography.fontFamily.primary, // Rubik-Regular
  },
  mutedWhiteText: {
    color: Colors.text.muted, // Light gray white
    fontFamily: Typography.fontFamily.secondary, // Rubik-Medium
  },
});
```

### Text Color Guidelines
- Use `Colors.text.inverse` for primary white text on dark backgrounds
- Use `Colors.text.muted` for secondary/helper white text
- Ensure proper contrast when using white text over background images

## Example Implementation

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Images, Typography } from '../../constants';
import { Container } from '../../components';

export const ExampleScreen: React.FC = () => {
  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea>
      <View style={styles.content}>
        <Text style={styles.title}>Main Title</Text>
        <Text style={styles.subtitle}>Secondary text</Text>
        <Text style={styles.body}>Body content goes here</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text.inverse, // Pure white
    fontFamily: Typography.fontFamily.display, // Rubik-Bold
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.muted, // Light gray white
    fontFamily: Typography.fontFamily.secondary, // Rubik-Medium
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    color: Colors.text.inverse,
    fontFamily: Typography.fontFamily.primary, // Rubik-Regular
    lineHeight: 24,
  },
});
```

## Important Notes

1. **Never use custom background images** - Only use the provided backgrounds from Images constants
2. **Always use Rubik font family** - Never use system fonts or other custom fonts
3. **Always use the defined white colors** - Don't hardcode white color values
4. **Test contrast** - Ensure white text is readable over the chosen background
5. **Follow the Container pattern** - Use the Container component for consistent layout
6. **Import from constants** - Always import Images, Colors, and Typography from the constants folder
7. **Use Typography.fontFamily** - Import and use the predefined font family constants for consistency

## Font Loading
The Rubik font family is automatically loaded in `App.tsx` with all required weights:
- Rubik-Light (300)
- Rubik-Regular (400) 
- Rubik-Medium (500)
- Rubik-SemiBold (600)
- Rubik-Bold (700)

These rules ensure visual consistency across the entire application and maintain the established design system with proper brand typography. 