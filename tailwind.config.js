/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js',],
  theme: {
    extend: {
      colors: {
        'governor-bay': {
          '50': '#eff2fe',
          '100': '#e3e7fc',
          '200': '#ccd2f9',
          '300': '#acb5f5',
          '400': '#8b8eee',
          '500': '#736fe5',
          '600': '#6354d7',
          '700': '#5141b9',
          '800': '#463a99',
          '900': '#3c357a',
          '950': '#241f47',
        },
        'tradewind': {
          '50': '#f2fbfa',
          '100': '#d4f3ee',
          '200': 'a9e6de',
          '300': '#75d3ca',
          '400': '#46b4ad',
          '500': '#2f9d98',
          '600': '#247d7b',
          '700': '#206563',
          '800': '#1e5151',
          '900': '#1d4443',
          '950': '#0b2728',
        },
        'stiletto': {
          '50': '#fdf3f3',
          '100': '#fbe5e5',
          '200': '#f8d0d0',
          '300': '#f1b0b0',
          '400': '#e78282',
          '500': '#da5959',
          '600': '#c53d3d',
          '700': '#a53030',
          '800': '#942e2e',
          '900': '#732929',
          '950': '#3e1111',
      },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

