/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': { 
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0.8 
          },
          '100%': { 
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 0 
          }
        }
      },
      animation: {
        'ripple': 'ripple 2s linear infinite',
      },
    },
  },
  plugins: [],
} 