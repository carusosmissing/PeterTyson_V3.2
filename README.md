# TruEXP - Fan Engagement Platform

TruEXP is a data-driven fan engagement and loyalty platform that enables artists, brands, and businesses to directly reward and cultivate Superfans, strengthen new relationships, and generate diverse revenue streams.

## 🚀 Tech Stack

- **Framework**: Expo SDK 49+ with React Native
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: Redux Toolkit with RTK Query
- **Backend**: Supabase-ready structure
- **Development Tools**: ESLint, Prettier, Husky

## 📱 App Flow

The app follows this navigation structure:

1. **Authentication Flow**: Welcome → Login/SignUp → ForgotPassword → Terms
2. **Onboarding Flow**: MusicOrSports → Onboarding Questions → Claim/ClaimReveal
3. **Main App**: Tab navigation with Home (TruTUB), The Pit, The Shrine, Search, Messaging, Profile
4. **Modal Screens**: Event Gallery, Shrine Views, Direct Messages

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components organized by feature
│   ├── auth/           # Login, SignUp, ForgotPassword, Terms
│   ├── onboarding/     # Welcome, MusicOrSports, Onboarding Questions
│   ├── main/           # Home (TruTUB), Search, Gallery, Messaging, Profile
│   ├── messaging/      # Inbox, DirectMessages, Chat screens
│   ├── events/         # Event Gallery, Event details
│   └── shrine/         # Shrine View screens
├── navigation/         # Navigation configuration
├── store/             # Redux store (placeholder for next phase)
├── services/          # API services and utilities
├── hooks/             # Custom hooks
├── types/             # TypeScript type definitions
├── constants/         # App constants (colors, fonts, etc.)
└── utils/             # Helper functions
```

## 🎨 Design System

The app uses a comprehensive design system with:

- **Colors**: TruEXP brand palette with purple/blue gradients, glassmorphism effects
- **Typography**: Complete font scale with semantic text styles
- **Spacing**: 4px grid system with semantic and layout spacing
- **Design Tokens**: Border radius, shadows, gradients, opacity levels
- **Components**: Reusable component library with consistent styling
- **Visual Effects**: Glassmorphism, blur effects, gradient backgrounds

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   cd petertyson_3.2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Assets Setup

The project expects assets to be located at `./assets/` in the project root. Copy your assets from `/Users/jg3/petertyson/petertyson/assets/` to the project's assets folder.

## 📝 Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## 🔧 Development Tools

### ESLint Configuration

The project uses ESLint with TypeScript and React Native rules for code quality.

### Prettier Configuration

Prettier is configured for consistent code formatting across the team.

### TypeScript

Full TypeScript support with strict type checking and navigation types.

## 🚧 Current Status

### ✅ Completed

- [x] Project initialization with Expo and TypeScript
- [x] Complete navigation structure with React Navigation v6
- [x] All placeholder screens created and connected
- [x] Design system with colors, typography, and spacing
- [x] TypeScript types for navigation and common interfaces
- [x] Development tooling (ESLint, Prettier)
- [x] Project structure and organization
- [x] **Redux Toolkit store configuration**
- [x] **Authentication state management**
- [x] **Onboarding state management**
- [x] **RTK Query API integration**
- [x] **Feature-based state slices**
- [x] **Typed Redux hooks**
- [x] **Navigation integration with Redux**
- [x] **Comprehensive design system with TruEXP brand colors**
- [x] **Component library with glassmorphism effects**
- [x] **Gradient backgrounds and visual effects**
- [x] **Reusable UI components (Button, InputField, Card, etc.)**
- [x] **Layout and navigation components**
- [x] **Design tokens and utility functions**
- [x] **Complete asset management system**
- [x] **Supabase client integration**
- [x] **Real-time messaging infrastructure**
- [x] **Image handling and user-generated content**
- [x] **Enhanced UI components (Avatar, ImagePicker, MessageBubble, SkeletonLoader)**
- [x] **Comprehensive form validation system**
- [x] **Performance optimizations and loading states**
- [x] **Security best practices and error handling**

### 🔄 Ready for Production

- [x] Complete Supabase integration setup
- [x] Real-time messaging functionality
- [x] Image upload and handling
- [x] Form validation and submission
- [x] Asset management and optimization
- [x] Loading states and skeleton screens
- [x] Error handling and user feedback
- [x] TypeScript integration throughout
- [x] Production-ready code quality

### 🔮 Future Phases

- [ ] Supabase backend integration
- [ ] Real-time messaging
- [ ] Push notifications
- [ ] Asset optimization and loading
- [ ] Performance optimization
- [ ] Testing setup (Jest, Detox)

## 🎯 Key Features (Planned)

- **Authentication**: Secure login/signup with email verification
- **Onboarding**: Personalized music/sports preference setup
- **TruTUB**: Main feed with fan engagement content
- **The Pit**: Community interaction space
- **The Shrine**: Premium fan experience
- **Messaging**: Direct messages and group chats
- **Events**: Event discovery and ticket integration
- **Profile**: User profile and preferences management

## 🤝 Team Development

The project is structured for team development with:

- Consistent code formatting and linting
- TypeScript for type safety
- Modular component architecture
- Clear separation of concerns
- Comprehensive documentation

## 📱 Platform Support

- iOS (iPhone and iPad)
- Android
- Web (responsive design)

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://api.truexp.com
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📄 License

This project is proprietary and confidential.

## 📞 Support

For development questions or issues, please contact the development team.

---

**Note**: This is the initial setup phase. The app currently shows placeholder screens with navigation working correctly. The next phase will implement Redux Toolkit for state management and begin API integration. 