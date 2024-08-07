/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      'xsm': {'max':'400px'},
      'sm': {'max':'576px'},
      'md': {'max':'768px'},
      'lg': {'max':'1024px'}
    },
    extend: {},
  },
  plugins: [],
}