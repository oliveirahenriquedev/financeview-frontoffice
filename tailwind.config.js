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
        "slide-in-right": "slideInRight 0.9s ease-in-out forwards",
        "slide-in-up": "slideInUp 0.5s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInUp: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
