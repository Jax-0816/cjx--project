/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E4F8F',
          light: '#4568AE',
          dark: '#213B69',
        },
        warm: {
          light: '#F4F8FF',
          DEFAULT: '#EAF1FB',
          dark: '#D3DEEE',
        },
        dark: {
          DEFAULT: '#1A2740',
          secondary: '#31445F',
        },
        accent: {
          DEFAULT: '#75AE45',
          dark: '#5E9331',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
