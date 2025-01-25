/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
import flowbite from "flowbite-react/tailwind";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        code: ["Fira Code", "Consolas", "Courier New", "monospace"],
        noto: ["Noto Sans", "Arial", "Helvetica", "sans-serif"],
        inter: ["Inter", "Arial", "Helvetica", "serif"],
      },
    },
  },
  plugins: [scrollbar, flowbite.plugin()],
};
