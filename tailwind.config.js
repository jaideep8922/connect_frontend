/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'], 
        },
      },
      animation: {
        'border-blink': 'border-blink-animation 1s infinite',
      },
      keyframes: {
        'border-blink-animation': {
          '0%, 100%': { borderColor: '#38bdf8' }, 
          '50%': { borderColor: '#ec4899' }, 
        },
      },
  },
  plugins: [],
}