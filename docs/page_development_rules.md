# Page Development Rules

## Background Images

When creating new pages or screens in this application, you must follow these background image rules:

### Available Background Images
Only use one of the 3 background images located in the `assets/backgrounds/` folder:

1. **background-1.png** - Available as `Images.background1`
2. **background-2.png** - Available as `Images.background2` 
3. **background-3.png** - Available as `Images.background3`

### How to Apply Background Images
Use the Container component with the `image` variant:

```tsx
import { Images } from '../../constants';
import { Container } from '../../components';

// Example usage
<Container variant="image" backgroundImage={Images.background2} safeArea>
  {/* Your page content */}
</Container>
```

### Background Image Selection Guidelines
- **background-1.png**: Use for welcome/landing screens
- **background-2.png**: Use for main app screens (like homepage)
- **background-3.png**: Use for secondary/detail screens

## Font Colors

### White Color Usage
For all text that needs to be white, use one of the white colors defined in `src/constants/colors.ts`:

#### Available White Colors:
- `Colors.text.inverse` - Pure white (`#FFFFFF`) - **Primary choice for white text**
- `Colors.text.muted` - Light gray (`#ECECEC`) - For muted/secondary white text

### How to Apply White Colors
```tsx
import { Colors } from '../../constants';

const styles = StyleSheet.create({
  whiteText: {
    color: Colors.text.inverse, // Pure white
  },
  mutedWhiteText: {
    color: Colors.text.muted, // Light gray white
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
import { Colors, Images } from '../../constants';
import { Container } from '../../components';

export const ExampleScreen: React.FC = () => {
  return (
    <Container variant="image" backgroundImage={Images.background2} safeArea>
      <View style={styles.content}>
        <Text style={styles.title}>Main Title</Text>
        <Text style={styles.subtitle}>Secondary text</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.inverse, // Pure white
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.muted, // Light gray white
  },
});
```

## Important Notes

1. **Never use custom background images** - Only use the 3 provided backgrounds
2. **Always use the defined white colors** - Don't hardcode white color values
3. **Test contrast** - Ensure white text is readable over the chosen background
4. **Follow the Container pattern** - Use the Container component for consistent layout
5. **Import from constants** - Always import Images and Colors from the constants folder

These rules ensure visual consistency across the entire application and maintain the established design system. 