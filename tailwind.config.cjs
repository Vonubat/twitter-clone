/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'welcome-bg': 'welcome-bg-keyframe 6s ease infinite',
        append: 'append-keyframe 0.5s linear',
      },
      keyframes: {
        'welcome-bg-keyframe': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'append-keyframe': {
          from: { transform: 'scale(0)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
