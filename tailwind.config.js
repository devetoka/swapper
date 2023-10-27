/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Define your light mode colors
        'light-primary': '#51d6ff',
        'light-white': '#fff',
        'light-secondary': '#333333',

        // Define your dark mode colors
        'dark-primary': '#1A202C',
        'dark-secondary': '#FFFFFF',
      },
    },
  },
  plugins: [],
}

