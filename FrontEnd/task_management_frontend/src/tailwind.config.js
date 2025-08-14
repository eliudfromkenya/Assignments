/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3B82F6',
                    light: '#93C5FD',
                    dark: '#1D4ED8'
                },
                secondary: {
                    DEFAULT: '#10B981',
                    light: '#6EE7B7',
                    dark: '#047857'
                }
            }, screens: {
                'xs': '480px',
                '3xl': '1920px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
