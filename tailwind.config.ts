/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(40 50% 98%)",
        foreground: "hsl(28 35% 20%)",
        primary: "hsl(150 45% 30%)",
      },
    },
  },
  plugins: [],
};
