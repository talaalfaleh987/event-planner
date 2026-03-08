/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#264653',
        subtitle: '#707070',
        error: '#9D1C1C',
        errorBg: '#F3E3E3',
      },
    },
  },
  plugins: [require('daisyui')],
};
