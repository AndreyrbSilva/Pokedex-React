/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {

      fontFamily: {
        display: ['"Press Start 2P"', 'monospace'],
        body: ['"Share Tech Mono"', 'monospace'],
      },

      colors: {
        base: {
          bg: '#0a0a0f',
          card: '#111118',
          border: '#1e1e2e',
          muted: '#2a2a3e',
        },

        neon: {
          green: '#39ff14',
          red: '#ff3131',
          blue: '#00d4ff',
          yellow: '#ffe600',
        },
      },

      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-12px)'
          }
        },

        pulsebg: {
          '0%, 100%': {
            opacity: '0.25',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.15)'
          }
        }
      },

      animation: {
        float: 'float 3s ease-in-out infinite',
        pulsebg: 'pulsebg 6s ease-in-out infinite'
      }

    },
  },

  plugins: [],
}