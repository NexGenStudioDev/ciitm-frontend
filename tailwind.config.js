/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      screens: {
         sm: '350px',
         // => @media (min-width: 576px) { ... }

         md: '1000px',
         // => @media (min-width: 960px) { ... }

         lg: '1200px',
         // => @media (min-width: 1440px) { ... }
      },
   },
   plugins: [],
};
