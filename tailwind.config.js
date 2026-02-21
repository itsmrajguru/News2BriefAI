/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Inter for clean, professional look
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488', // Teal Primary
          700: '#0f766e',
        },
        slate: {
          50: '#f8fafc', // Light background
          100: '#f1f5f9',
          200: '#e2e8f0', // Border color
          800: '#1e293b',
          900: '#0f172a', // Text Primary
        }
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0,0,0,0.03)', // Very subtle shadow
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
