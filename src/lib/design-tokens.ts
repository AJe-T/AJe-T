/**
 * LogiSaaS Design Tokens
 * Treat every token, color, and rule as immutable law.
 */

export const colors = {
  primary: {
    50: '#f7eef7',
    100: '#eddbee',
    200: '#dbb8db',
    300: '#c494c4',
    400: '#b87bb8',
    500: '#a767a7',
    600: '#8f528f',
    700: '#733f73',
    800: '#562d56',
    900: '#381c38',
  },
  accent: {
    100: '#fdf3e3',
    400: '#f0a94e',
    500: '#e8952e',
  },
  success: {
    100: '#dcfce7',
    500: '#22c55e',
    700: '#15803d',
  },
  warning: {
    100: '#fef9c3',
    500: '#f59e0b',
    700: '#b45309',
  },
  danger: {
    100: '#fee2e2',
    500: '#ef4444',
    700: '#b91c1c',
  },
  info: {
    100: '#dbeafe',
    500: '#3b82f6',
    700: '#1d4ed8',
  },
  neutral: {
    0: '#ffffff',
    25: '#faf8fa',
    50: '#f4f1f4',
    100: '#ebe6eb',
    200: '#d6cdd6',
    300: '#b8acb8',
    400: '#9a8a9a',
    500: '#7a6a7a',
    600: '#5a4d5a',
    700: '#3d333d',
    800: '#261e26',
    900: '#140e14',
  },
};

export const chartColors = [
  '#a767a7', // primary purple
  '#e8952e', // amber
  '#22c55e', // green
  '#3b82f6', // blue
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
];

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
};

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  xs: '0 1px 2px rgba(167,103,167,0.04)',
  sm: '0 1px 3px rgba(167,103,167,0.08), 0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 6px rgba(167,103,167,0.07), 0 2px 4px rgba(0,0,0,0.05)',
  lg: '0 10px 15px rgba(167,103,167,0.10), 0 4px 6px rgba(0,0,0,0.05)',
  xl: '0 20px 25px rgba(167,103,167,0.12), 0 8px 10px rgba(0,0,0,0.06)',
};

export const fonts = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};
