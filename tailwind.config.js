const defaultTheme = require("tailwindcss/defaultTheme");
const defaultColors = require("tailwindcss/colors");

module.exports = {
  darkMode: "media",
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      grn: "#1BC47D",
      drk: "#011B27",
      mdrk: "#01141D",
      segrn: "#18A167",
      gry: "#616161",
      blck: "#130301",
      rd: "#9E2146",
      serd: "#6B142E",
      wht: "#F3E8EE",
      gryf: "#1A0404",
      black: '#000',
      white: '#fff',
    },
  },
};
