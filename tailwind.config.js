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
      extend: {
         animation: {
            'spin-slow': 'spin 3s linear infinite',
            'bounce-slow': 'bounce 2s infinite',
            'pulse-slow':
               'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
         },
         backdropBlur: {
            '2xl': '40px',
         },
         borderWidth: {
            3: '3px',
         },
      },
   },
   plugins: [],
};
