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
          300: '#85979E',
          400: '#E0E5E6',
          500: '#E6E7E8',
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
        green: {
          100: '#228B22',
          200: '#E0EEE0',
          300: '#8FBC8F',
          400: '#D2EED7',
          500: '#4BBF64',
        },
        orange: {
          100: '#FFE3DC',
          200: '#FF9479',
        },
        purple: {
          100: '#F0E1FE',
          200: '#C48CFF',
        },
        pink: {
          100: '#FDD4DD',
          200: '#FA5A7D',
        },
        beige: {
          normal: '#FBF4E2',
        },
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(112.9deg, #1D3557 0%, #264653 50%, #5FB6AB 100%)',
      },
      screens: {
        'lg-plus': '1025px',
      },
    },
  },
  plugins: [require('daisyui')],
};
