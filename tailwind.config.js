/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        elegant: ['Cormorant Garamond', 'Georgia', 'serif'],
        clean: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        sky: {
          300: '#87CEEB',
          400: '#7EC8E3',
        },
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'fade-in-scale': 'fadeInScale 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'bounce': 'bounce 2s infinite',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
