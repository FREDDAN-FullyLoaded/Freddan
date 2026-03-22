/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C8102E',
          gold: '#FFB800',
          dark: '#0A0A0A',
          charcoal: '#1A1A1A',
          smoke: '#2A2A2A',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-red': 'pulseRed 2s infinite',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        bounceIn: {
          from: { transform: 'scale(0.8)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200,16,46,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(200,16,46,0)' },
        }
      }
    },
  },
  plugins: [],
}
