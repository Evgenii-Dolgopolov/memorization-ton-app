/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add paths to your template files
  ],
  theme: {
    screens: {
      sm: "576px",
    },
    extend: {
      colors: {
        customColor: "#1a202c", // Add a custom color with the name 'customColor'
      },
      spacing: {
        128: "32rem", // Add a custom spacing value with the key '128'
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Add a custom font family with the name 'sans'
      },
      screens: {
        "3xl": "1600px", // Add a custom breakpoint with the name '3xl'
      },
    },
  },
  plugins: [forms, typography],
}
