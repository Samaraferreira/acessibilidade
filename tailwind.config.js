/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // WCAG 2.1 Level AAA compliant color palette
        blue: {
          900: '#1a365d', // Better contrast for primary actions
          950: '#0f2034', // Darker hover state
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#595959', // WCAG AAA compliant
          600: '#404040', // WCAG AAA compliant
          700: '#262626', // WCAG AAA compliant
          800: '#1f2937',
          900: '#111827',
        },
      },
      boxShadow: {
        focus: '0 0 0 4px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
};