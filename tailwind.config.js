/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.vue'],
  prefix: 'tw-',
  theme: {
    extend: {
      fontSize: {
        
      },
      fontFamily: {
        gilroy: 'Gilroy',
        'ua-brand': 'ua-Brand',
      },
      borderRadius: {
        
      },
    },
    colors: {
      blue_main: '#C6D9F1',
      blue_bg: '#E5EEF9',
      blue_light: '#F5F9FF',
      blue_icon: '#98B7DE',
      blue_icon__light: '#C3D1E4',
      blue_stories: '#6475F2',
      blue_link: '#529BD0',

      geen_btn: '#E9FF5E',
      
      red: '#FF3B30',

      black: '#000000',
      gray_main: '#161616',
      gray_icon: '#7F7F7F',
      gray_medium: '#E5E5E5',
      white: '#FFFFFF'

    },

    container: {
      center: true,
      padding: '12px',
    },
  },
  plugins: [],
}
