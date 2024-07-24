/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      typographica: ["TypoGraphica"],
      astonpoliz: ["Astonpoliz"],
    },
    extend: {
      backgroundImage: {
        "chart-pattern":
          "url(/public/images/lightweight-charts.5c935e728656427cb801.jpg)",
        "chart-pattern-2": "url(/public/images/chart-2.png)",
        "chart-pattern-3": "url(/public/images/bg5.gif)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
