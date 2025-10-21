/**
 * Application Theme
 * Defines all design tokens (colors, spacing, typography, etc.)
 */

export const theme = {
  colors: {
    // Primary colors
    primary: {
      main: '#0969da',
      light: '#3b8aff',
      dark: '#0550ae',
      contrast: '#ffffff',
    },
    
    // Secondary colors
    secondary: {
      main: '#6e7781',
      light: '#8c959f',
      dark: '#57606a',
      contrast: '#ffffff',
    },
    
    // Status colors
    success: {
      main: '#1a7f37',
      light: '#2da44e',
      dark: '#116329',
      background: '#dafbe1',
    },
    
    error: {
      main: '#cf222e',
      light: '#ff6b6b',
      dark: '#a40e26',
      background: '#ffebe9',
    },
    
    warning: {
      main: '#fb8500',
      light: '#ffb703',
      dark: '#d97706',
      background: '#fff4e6',
    },
    
    info: {
      main: '#0969da',
      light: '#54aeff',
      dark: '#0550ae',
      background: '#ddf4ff',
    },
    
    // Issue states
    issue: {
      open: '#1a7f37',
      closed: '#8250df',
      openBg: '#dafbe1',
      closedBg: '#fbefff',
    },
    
    // Neutral colors
    neutral: {
      white: '#ffffff',
      black: '#1f2328',
      gray: {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
      },
    },
    
    // Background colors
    background: {
      default: '#ffffff',
      paper: '#f6f8fa',
      subtle: '#eaeef2',
      hover: '#f3f4f6',
    },
    
    // Border colors
    border: {
      default: '#d0d7de',
      subtle: '#eaeef2',
      strong: '#8c959f',
    },
    
    // Text colors
    text: {
      primary: '#1f2328',
      secondary: '#57606a',
      tertiary: '#6e7781',
      disabled: '#8c959f',
      inverse: '#ffffff',
      link: '#0969da',
      linkHover: '#0550ae',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Spacing (using 4px base unit)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',   // 48px
    '4xl': '4rem',   // 64px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // Transitions
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      linear: 'linear',
    },
  },
  
  // Z-index
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
  
  // Breakpoints (for responsive design)
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type Theme = typeof theme;

// Type for theme colors
export type ThemeColors = typeof theme.colors;
