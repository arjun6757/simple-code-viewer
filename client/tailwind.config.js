/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
import flowbite from "flowbite/plugin";
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ["Fira Code", "Consolas", "Courier New", "monospace"]
      },
    },
  },
  plugins: [
    scrollbar,
    flowbite,
  ],
}