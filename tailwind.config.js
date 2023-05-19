/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#453F3A",
        "custom-brown": "#2D2420",
        "custom-light-brown": "#493A34",
        "custom-orange": "#DC723F",
        "custom-human-skin": "#FDF7F2",
      },
    },
  },
  plugins: [],
};
