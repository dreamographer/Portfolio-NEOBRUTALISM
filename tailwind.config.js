/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Unbounded', 'cursive'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'smooth-bounce': 'smooth-bounce 2s infinite',
      },
      keyframes: {
        'smooth-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};