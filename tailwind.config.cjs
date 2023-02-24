/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        bg: 'bg-keyframe 6s ease infinite',
        append: 'append-keyframe 0.5s linear',
        'random-move-x': 'x-random-keyframe 2.6s linear infinite alternate',
        'random-move-y': 'y-random-keyframe 0.8s linear infinite alternate',
      },
      keyframes: {
        'bg-keyframe': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'append-keyframe': {
          from: { transform: 'scale(0)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
        'x-random-keyframe': {
          '100%': { transform: 'translateX(calc(100vw - 150px))' },
        },
        'y-random-keyframe': {
          '100%': { transform: 'translateY(calc(100vh - 150px))' },
        },
      },
    },
  },
  plugins: [],
};
