const {heroui} = require('@heroui/theme');
const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|chip|ripple|spinner).js",
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js"
  ],
  theme: {
    extend: {
      // Custom Keyframes for Animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      // Custom Animations
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-delay': 'fadeIn 1.5s ease-out',
        'fade-left': 'fadeLeft 1s ease-out',
        'fade-left-delay': 'fadeLeft 1.5s ease-out',
        'fade-right': 'fadeRight 1s ease-out',
        'fade-right-delay': 'fadeRight 1.5s ease-out',
        'slide-down': 'slideDown 1s ease-out',
        'slide-down-delay': 'slideDown 1.5s ease-out',
        'scale-in': 'scaleIn 1s ease-out',
        'scale-in-delay': 'scaleIn 1.5s ease-out',
        'zoom-in': 'zoomIn 1s ease-out',
        'zoom-in-delay': 'zoomIn 1.5s ease-out',
      },
    },
  },
  plugins: [nextui(),heroui()],
};
