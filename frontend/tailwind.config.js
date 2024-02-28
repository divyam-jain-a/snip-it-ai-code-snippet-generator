/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        customgreen: '#59C46D',
        customblack: '#121212',
        customwhite: '#F1F1F1',
        // Add more custom colors as needed
      },
      scrollbar: {
        width: '12px', // Set the width of the scrollbar
        track: '#f1f1f1', // Set the track color
        thumb: '#888', // Set the thumb color
      },
    },
  },
  plugins: [],
}