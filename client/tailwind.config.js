/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "999999-important": "999999 !important",
      },
      colors: {
        primary: "#161880",
        yellow: "#FDC525",
        white: "#F8F4FB",
        blue: "#0A6CDC",
        lightgrey: "#F5F5F5",
        red: "#D12442",
        darkYellow: "#C8AEE2",
      },
    },
  },
  plugins: [],
};
