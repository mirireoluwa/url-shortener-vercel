/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkviolet: 'hsl(257, 27%, 26%)',
        gray: 'hsl(0, 0%, 75%)',
        cyan: 'hsl(180, 66%, 49%)',
        grayishviolet: 'hsl(257, 7%, 63%)',
        verydarkviolet: 'hsl(260, 8%, 14%)',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
