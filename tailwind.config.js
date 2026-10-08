/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Space Grotesk', 'sans-serif'] },
      colors: { ink: '#07070a', electric: '#8b5cf6', cyan: '#22d3ee' }
    }
  },
  plugins: []
}
