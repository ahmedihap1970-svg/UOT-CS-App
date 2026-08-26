import { StyleSheet } from 'react-native';

/**
 * ============================================================================
 *  UNIVERSITY CS DEPARTMENT APP — DESIGN SYSTEM
 *  React Native (Expo) · Single Source of Truth for all UI tokens
 * ----------------------------------------------------------------------------
 *  Brand direction : Academic Navy (Official) + Gold (Accent)
 *  Structure       : Colors · Typography · Spacing · Radii · Elevation
 * ============================================================================
 */

/* ------------------------------------------------------------------ */
/* 1 · RAW PALETTE                                                     */
/* ------------------------------------------------------------------ */
const palette = {
  /** Academic navy scale — 900 is the official departmental dark blue */
  navy: {
    50: '#EEF3FA',
    100: '#D9E4F1',
    200: '#B3C8E3',
    300: '#7FA0C9',
    400: '#4C74A6',
    500: '#2C5A8F',
    600: '#204671',
    700: '#163457',
    800: '#102744',
    900: '#0C2340', // ★ Official University Navy
  },

  /** Old-gold accent scale — used sparingly for CTAs & highlights */
  gold: {
    50: '#FCF6E5',
    100: '#F9EDC7',
    200: '#F3DA94',
    300: '#EDC662',
    400: '#E6B444',
    500: '#E0A82E', // ★ Main accent gold
    600: '#BE8A1E',
    700: '#976C15',
    800: '#71500F',
    900: '#4A340A',
  },

  /** Cool neutral grays (slightly blue-tinted to match the navy) */
  neutral: {
    0: '#FFFFFF',
    50: '#F4F6FA',
    100: '#EDF1F7',
    200: '#E8ECF3',
    300: '#DDE3ED',
    400: '#B8C1CF',
    500: '#7A8699',
    600: '#45526B',
    700: '#232D42',
    900: '#131C33',
  },
};

/* ------------------------------------------------------------------ */
/* 2 · SEMANTIC COLORS — always reference THESE in components          */
/* ------------------------------------------------------------------ */
export const Colors = {
  // Brand
  primary:        palette.navy[900],   // Headers, active tabs, primary buttons
  primaryDark:    palette.navy[800],
  primaryLight:   palette.navy[500],
  secondary:      palette.navy[500],   // Links, icons, secondary emphasis
  accent:         palette.gold[500],   // CTAs, badges, highlights
  accentSoft:     palette.gold[100],   // Accent backgrounds / chips

  // Surfaces
  background:     palette.neutral[50], // Screen background
  surface:        palette.neutral[0],  // Cards, sheets, inputs
  surfaceAlt:     palette.neutral[100],// Subtle sections, list stripes

  // Text (WCAG-checked against their backgrounds)
  text: {
    primary:      palette.neutral[900],// Body copy on light surfaces
    secondary:    palette.neutral[600],// Subtitles, supporting copy
    muted:        palette.neutral[500],// Captions, placeholders, timestamps
    onPrimary:    palette.neutral[0],  // Text on navy surfaces
    onAccent:     palette.navy[900],   // Text on gold buttons (navy = AA pass)
    inverse:      palette.neutral[0],
  },

  // Borders
  border:         palette.neutral[300],
  divider:        palette.neutral[200],

  // Status
  success:        '#2F9E44',
  successBg:      '#E6F6EA',
  warning:        '#E68A00',
  warningBg:      '#FEF3E0',
  error:          '#D64545',
  errorBg:        '#FCEAEA',
  info:           palette.navy[500],
  infoBg:         '#EAF1F9',

  // Overlays
  overlay:        'rgba(12, 35, 64, 0.55)',   // Modal scrim (navy @ 55%)
  shimmer:        palette.neutral[100],

  /** Raw scales exposed for gradients, charts, data-viz needs */
  navyScale: palette.navy,
  goldScale: palette.gold,
  neutralScale: palette.neutral,
};

/* ------------------------------------------------------------------ */
/* 3 · TYPOGRAPHY                                                      */
/* ------------------------------------------------------------------ */
export const Typography = {
  /**
   * Swap these keys for real families once loaded via expo-font,
   * e.g. regular: 'Inter_400Regular'. 'System' uses the native
   * default (SF Pro on iOS / Roboto on Android).
   */
  fonts: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  sizes: {
    display: 34,   // Hero numbers, welcome headlines
    h1: 28,        // Screen titles
    h2: 24,        // Section headers
    h3: 20,        // Card titles
    subtitle: 17,  // List subtitles
    body: 16,      // Default reading size
    bodySmall: 14, // Dense lists, secondary body
    caption: 12,   // Captions, helper text, timestamps
    overline: 10,  // Uppercase labels / tags
  },

  lineHeights: {
    display: 42,
    h1: 36,
    h2: 32,
    h3: 28,
    subtitle: 24,
    body: 24,
    bodySmall: 20,
    caption: 16,
    overline: 14,
  },

 weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
};

/** Ready-to-spread text presets — keeps StyleSheets DRY */
export const TextStyles = {
  display: {
    fontSize: Typography.sizes.display,
    lineHeight: Typography.lineHeights.display,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  h1: {
    fontSize: Typography.sizes.h1,
    lineHeight: Typography.lineHeights.h1,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  h2: {
    fontSize: Typography.sizes.h2,
    lineHeight: Typography.lineHeights.h2,
    fontWeight: Typography.weights.semiBold,
    color: Colors.text.primary,
  },
  h3: {
    fontSize: Typography.sizes.h3,
    lineHeight: Typography.lineHeights.h3,
    fontWeight: Typography.weights.semiBold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.sizes.subtitle,
    lineHeight: Typography.lineHeights.subtitle,
    fontWeight: Typography.weights.medium,
    color: Colors.text.secondary,
  },
  body: {
    fontSize: Typography.sizes.body,
    lineHeight: Typography.lineHeights.body,
    fontWeight: Typography.weights.regular,
    color: Colors.text.primary,
  },
  bodySmall: {
    fontSize: Typography.sizes.bodySmall,
    lineHeight: Typography.lineHeights.bodySmall,
    fontWeight: Typography.weights.regular,
    color: Colors.text.secondary,
  },
  caption: {
    fontSize: Typography.sizes.caption,
    lineHeight: Typography.lineHeights.caption,
    fontWeight: Typography.weights.regular,
    color: Colors.text.muted,
  },
  overline: {
    fontSize: Typography.sizes.overline,
    lineHeight: Typography.lineHeights.overline,
    fontWeight: Typography.weights.semiBold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.text.muted,
  },
};

/* ------------------------------------------------------------------ */
/* 4 · SPACING (4pt baseline grid)                                     */
/* ------------------------------------------------------------------ */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,   // Default gap between cards/list items
  xl: 24,   // Default screen edge padding
  xxl: 32,
  xxxl: 48,
};

/* ------------------------------------------------------------------ */
/* 5 · LAYOUT                                                          */
/* ------------------------------------------------------------------ */
export const Layout = {
  screenPadding: 20,     // Horizontal padding for every screen
  headerHeight: 56,
  tabBarHeight: 60,
};

/* ------------------------------------------------------------------ */
/* 6 · RADII & BORDERS                                                 */
/* ------------------------------------------------------------------ */
export const BorderRadius = {
  sm: 8,      // Inputs, chips
  md: 12,     // Buttons, list rows
  lg: 16,     // Cards
  xl: 24,     // Sheets, modals
  pill: 999,  // Tags, avatars rings, pills
};

export const Borders = {
  hairline: StyleSheet?.hairlineWidth ?? 0.5,
  thin: 1,
  thick: 2,
};

/* ------------------------------------------------------------------ */
/* 7 · ELEVATION (iOS shadow + Android elevation paired)               */
/* ------------------------------------------------------------------ */
export const Shadows = {
  sm: {
    shadowColor: palette.navy[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: { // Default card elevation
    shadowColor: palette.navy[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: palette.navy[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
};

/* ------------------------------------------------------------------ */
/* DEFAULT EXPORT — everything under one namespace                     */
/* ------------------------------------------------------------------ */
const Theme = {
  Colors,
  Typography,
  TextStyles,
  Spacing,
  Layout,
  BorderRadius,
  Borders,
  Shadows,
};

export default Theme;
