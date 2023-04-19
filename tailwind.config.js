/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'seoul': "url('/public/image/seoul.png')",
        
      }
    },
  },
  plugins: [],
}
