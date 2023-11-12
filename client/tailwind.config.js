/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        {
            pattern:/(bg|from|to|border)-(blue|red|yellow|green|purple|gray)-(50|200|400|700|800|900)/,
            variants:['hover','dark']
            // pattern:/hover:bg-(blue|red|yellow|green|purple|gray)-(50|200|400|700|800|900)/
        }
    ],
    theme: {
        extend: {
            boxShadow: {
                'card': '6px 6px 12px #d9d9d9,-6px -6px 12px #ffffff;',
                
            },  
        },
        colors:{
            seperator: 'rgb(38,38,38)',
        }
        
    },
    plugins: [],
})



