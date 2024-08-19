/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Signup_bck': "url('/src/Assets/signup-bckground.jpg')", // Adjust the path to the image
      },
      colors: {
        'spotify-dark-gray': '#1e1e1e',
      },
    },
  },
  plugins: [],
}
