/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs","./views/*.ejs"],
  mode: "jit",
  theme: {
    fontFamily:{
      'Poppins':['Poppins', 'sans-serif']
    },
    extend: {
      'animation': {
            'text':'text 5s ease infinite',
        },
        'keyframes': {
            'text': {
                '0%, 100%': {
                   'background-size':'200% 200%',
                    'background-position': 'left center'
                },
                '50%': {
                   'background-size':'200% 200%',
                    'background-position': 'right center'
                }
            },
        }
    },
  },
  plugins: [],
};
