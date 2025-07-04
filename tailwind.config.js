/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sunny': 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
        'cloudy': 'linear-gradient(135deg, #74B9FF 0%, #0984FF 100%)',
        'rainy': 'linear-gradient(135deg, #4ECDC4 0%, #2E8B57 100%)',
        'snowy': 'linear-gradient(135deg, #E6F3FF 0%, #B8C6DB 100%)',
      },
    },
  },
  plugins: [],
}