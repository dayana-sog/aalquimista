
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', 
  content: [
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      body: ['Roboto'],
    },
    extend: {},
  },
  plugins: [],
}