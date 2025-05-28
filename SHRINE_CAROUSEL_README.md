# Shrine Carousel Implementation

## Overview
Updated the shrine page to display a horizontal carousel of trustubs that replicates the design shown in the provided screenshots.

## What Was Implemented

### 1. TrustubCarousel Component (`src/components/trustub_carousel.tsx`)
- **Horizontal scrolling carousel** with snap-to-center functionality
- **Card-based design** matching the screenshot aesthetics
- **Pagination dots** at the bottom to show current position
- **Responsive design** that adapts to screen width
- **Smooth scrolling** with proper snap intervals

### 2. Updated Shrine Screen (`src/screens/main/the_shrine_screen.tsx`)
- **Replaced placeholder content** with the trustub carousel
- **Removed duplicate title** - only "My Shrine" in header remains
- **Full-page carousel** that fills the entire available screen space
- **Added trustub data** for 4 different artists:
  - Lady Gaga - Hollywood Bowl (2025)
  - Kendrick Lamar - The Forum (2024)
  - Fred Again - Madison Square Garden (2024)
  - SZA - Kaseya Center (2024)
- **Updated header title** to "My Shrine" to match screenshots

## Key Features

### Carousel Functionality
- **Snap-to-center**: Each trustub card snaps to the center when scrolling
- **Horizontal scrolling**: Smooth horizontal navigation between trustubs
- **Visual feedback**: Active pagination dot shows current position
- **Touch-friendly**: Easy to swipe between cards

### Card Design
- **Full-screen trustub image** as the background (Instagram-style)
- **Text overlay** directly on the trustub image
- **Header section** showing stub number and year at the top
- **Artist and venue information** centered on the image
- **Text shadows** for better readability over images
- **Portrait aspect ratio** optimized for mobile viewing

### Visual Elements
- **Purple gradient background** matching the app's design
- **White text** for good contrast
- **Rounded corners** for modern appearance
- **Proper padding** and margins for clean layout

## Technical Implementation

### Components Used
- `ScrollView` with horizontal scrolling
- `snapToInterval` for center-snapping behavior
- `Dimensions` API for responsive sizing
- Custom pagination indicator

### Styling Approach
- **Responsive card width** (85% of screen width)
- **Instagram-style portrait ratio** (1.4:1 aspect ratio)
- **Full-image background** with text overlays
- **Text shadows** for readability over images
- **Minimal overlay** to preserve image visibility
- **Proper spacing** between cards

## Files Modified
1. `src/components/trustub_carousel.tsx` - New carousel component
2. `src/components/index.ts` - Added carousel export
3. `src/screens/main/the_shrine_screen.tsx` - Updated to use carousel
4. Added trustub data matching the screenshot examples

## Usage
The carousel automatically displays all trustubs and allows users to:
- Swipe horizontally to navigate between trustubs
- See which trustub is currently active via pagination dots
- View full trustub details including artist, venue, and year
- Experience smooth, centered scrolling behavior

The implementation successfully replicates the design shown in the provided screenshots with a focus on user experience and visual appeal. 