/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add paths to your template files
  ],
  theme: {
    extend: {
      colors: {
        customColor: "#1a202c",
      },
      spacing: {
        128: "32rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Add custom fonts
      },
      screens: {
        "3xl": "1600px", // Add custom breakpoints
      },
    },
  },
  plugins: [forms, typography],
}
