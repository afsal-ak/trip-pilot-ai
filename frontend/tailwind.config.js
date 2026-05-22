/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#0284C7', // sky blue
        secondary: '#06B6D4', // cyan
        background: '#F8FAFC',
        foreground: '#0F172A',

        card: '#FFFFFF',
        border: '#E2E8F0',

        muted: '#F1F5F9',
        'muted-foreground':
          '#64748B',

        success: '#10B981',
        danger: '#EF4444',
      },

      fontFamily: {
        poppins: [
          'Poppins',
          'sans-serif',
        ],
      },

      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
    },
  },

  plugins: [
    require(
      'tailwindcss-animate'
    ),
  ],
};