# Onboarding Flow Structure

### 1. Initial Selection (MusicOrSportsScreen)
- Users select Music, Sports, or both
- Determines which question flow(s) they'll see

### 2. Music Flow (3 screens)
If user selects Music or both:
- **MusicGigCountScreen**: How many live music events per year
- **MusicFanFuelScreen**: Main reason for attending music events
- **MusicVibeScreen**: Top 3 music genres (multi-select)

### 3. Sports Flow (3 screens)  
If user selects Sports or both:
- **SportsGameCountScreen**: How many sporting events per year
- **SportsBig3Screen**: Top 3 favorite sports (multi-select)
- **SportsFanFuelScreen**: Main reason for attending sporting events

### 4. Final Screen
- **WelcomeClaimScreen**: Final completion screen

## Navigation Logic

- **Music only**: MusicOrSports → MusicGigCount → MusicFanFuel → MusicVibe → WelcomeClaimScreen
- **Sports only**: MusicOrSports → SportsGameCount → SportsBig3 → SportsFanFuel → WelcomeClaimScreen
- **Both**: MusicOrSports → MusicGigCount → MusicFanFuel → MusicVibe → SportsGameCount → SportsBig3 → SportsFanFuel → WelcomeClaimScreen

## State Management

All answers are stored in Redux using the `onboarding` slice:
- `selectedCategory`: 'music' | 'sports' | 'both'
- `answers`: Array of question responses
- `hasCompletedOnboarding`: Boolean flag

## Design Features

- Consistent gradient background
- Logo placement in top-left
- Single and multi-select question types
- Selection counters for multi-select questions
- Disabled states for buttons when no selection
- Smooth navigation flow based on user choices 