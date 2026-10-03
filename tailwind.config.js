/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        italiana: ['"Italiana"', 'serif'],
        bodoni: ['"Bodoni Moda"', 'serif'],
        script: ['"Great Vibes"', '"Pinyon Script"', 'cursive'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        alex: ['"Alex Brush"', 'cursive'],
        sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
      },
      colors: {
        palette: {
          bg: '#FBF8F5',
          card: 'rgba(255, 255, 255, 0.72)',
          border: 'rgba(218, 195, 185, 0.4)',
          text: '#2C2724',
          subtext: '#6E645F',
          muted: '#8C827C',
          blush: '#F4D8D8',
          dustyRose: '#CFA4A4',
          dustyRoseDark: '#B88282',
          warmBeige: '#EBE2D5',
          lightGrey: '#E2DFDB',
          gold: '#C5A880',
          darkGold: '#A8895E',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(197, 168, 128, 0.12), 0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 12px 40px 0 rgba(197, 168, 128, 0.2), 0 4px 12px 0 rgba(0, 0, 0, 0.06)',
        'phone-frame': '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 12px #1c1c1e, 0 0 0 13px #3a3a3c, 0 35px 80px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
