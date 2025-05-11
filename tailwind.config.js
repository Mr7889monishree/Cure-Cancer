/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px", // add this
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      fontFamily: {
        epilogue: ["Epilogue", "sans-serif", "Poppins"],
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
      },
      colors: {
        mainBackgroundColor: "#0D1117",
        columnBackgroundColor: "#161C22",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
