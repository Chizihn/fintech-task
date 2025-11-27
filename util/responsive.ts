import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Responsive utilities for cross-platform and multi-screen support
 */
export const Responsive: any = {
  // Screen dimensions
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,

  // Device type detection
  isTablet: SCREEN_WIDTH >= 768,
  isSmallDevice: SCREEN_WIDTH < 350,
  isLargeDevice: SCREEN_WIDTH > 414,

  // Responsive scaling
  scale: (size: number): number => {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
  },

  // Vertical scaling
  verticalScale: (size: number): number => {
    const scale = SCREEN_HEIGHT / BASE_HEIGHT;
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
  },

  // Moderate scaling (less aggressive)
  moderateScale: (size: number, factor: number = 0.5): number => {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    return Math.round(
      PixelRatio.roundToNearestPixel(size + (scale - 1) * factor)
    );
  },

  // Font scaling with accessibility support
  fontScale: (size: number): number => {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    const newSize = size * scale;

    // Ensure minimum readable size
    if (newSize < 12) return 12;
    // Cap maximum size for very large screens
    if (newSize > size * 1.3) return size * 1.3;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },

  // Padding/margin scaling
  spacing: (size: number): number => {
    return Responsive.moderateScale(size, 0.3);
  },

  // Platform-specific values
  platformValue: <T>(ios: T, android: T): T => {
    return Platform.OS === "ios" ? ios : android;
  },

  // Device-specific values
  deviceValue: <T>(phone: T, tablet: T): T => {
    return Responsive.isTablet ? tablet : phone;
  },

  // Safe area helpers
  getTabBarHeight: (): number => {
    return Responsive.platformValue(
      Responsive.isTablet ? 65 : 60,
      Responsive.isTablet ? 60 : 55
    );
  },

  getHeaderHeight: (): number => {
    return Responsive.platformValue(
      Responsive.isTablet ? 100 : 90,
      Responsive.isTablet ? 90 : 80
    );
  },

  // Breakpoints
  breakpoints: {
    small: 350,
    medium: 414,
    large: 768,
    xlarge: 1024,
  },

  // Check if screen matches breakpoint
  isBreakpoint: (breakpoint: keyof typeof Responsive.breakpoints): boolean => {
    return SCREEN_WIDTH >= Responsive.breakpoints[breakpoint];
  },
};
