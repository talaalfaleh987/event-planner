/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          normal: '#264653',
          100: '',
          200: '',
          300: '',
          400: '',
          500: '',
        },
        grey: {
          subtitle: '#707070',
          100: '#F9F9F9',
          200: '#FFFDFD',
          300: '',
          400: '',
          500: '',
        },
        red: {
          error: '#9D1C1CCC',
          100: '',
          200: '',
          300: '',
        },
        errorBg: {
          normal: '#F3E3E3',
          100: '',
          200: '',
        },
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(112.9deg, #1D3557 0%, #264653 50%, #5FB6AB 100%)',
      },
    },
  },
  plugins: [require('daisyui')],
};
