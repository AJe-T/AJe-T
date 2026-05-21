import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--color-primary-500)",
          foreground: "var(--color-neutral-0)",
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          DEFAULT: "var(--color-primary-50)",
          foreground: "var(--color-primary-700)",
        },
        destructive: {
          DEFAULT: "var(--color-danger-500)",
          foreground: "var(--color-neutral-0)",
        },
        muted: {
          DEFAULT: "var(--color-neutral-100)",
          foreground: "var(--color-neutral-500)",
        },
        accent: {
          DEFAULT: "var(--color-accent-500)",
          foreground: "var(--color-neutral-0)",
          100: 'var(--color-accent-100)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
        },
        popover: {
          DEFAULT: "var(--color-neutral-0)",
          foreground: "var(--color-neutral-800)",
        },
        card: {
          DEFAULT: "var(--color-neutral-0)",
          foreground: "var(--color-neutral-800)",
        },
        success: {
          100: 'var(--color-success-100)',
          500: 'var(--color-success-500)',
          700: 'var(--color-success-700)',
        },
        warning: {
          100: 'var(--color-warning-100)',
          500: 'var(--color-warning-500)',
          700: 'var(--color-warning-700)',
        },
        danger: {
          100: 'var(--color-danger-100)',
          500: 'var(--color-danger-500)',
          700: 'var(--color-danger-700)',
        },
        info: {
          100: 'var(--color-info-100)',
          500: 'var(--color-info-500)',
          700: 'var(--color-info-700)',
        },
        neutral: {
          0: 'var(--color-neutral-0)',
          25: 'var(--color-neutral-25)',
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--text-xs-lh)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--text-sm-lh)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--text-base-lh)' }],
        md: ['var(--text-md)', { lineHeight: 'var(--text-md-lh)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--text-lg-lh)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--text-xl-lh)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--text-2xl-lh)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--text-3xl-lh)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--text-4xl-lh)' }],
      },
      fontWeight: {
        regular: 'var(--weight-regular)',
        medium: 'var(--weight-medium)',
        semibold: 'var(--weight-semibold)',
        bold: 'var(--weight-bold)',
        extrabold: 'var(--weight-extrabold)',
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-dot": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
