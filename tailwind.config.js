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
    },
  },
  plugins: [],
}