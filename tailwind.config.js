import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    light: '#4ADE80',  // Light green
                    DEFAULT: '#22C55E', // Medium green
                    dark: '#16A34A',   // Dark green
                },
                secondary: {
                    light: '#60A5FA',  // Light blue
                    DEFAULT: '#3B82F6', // Medium blue
                    dark: '#2563EB',   // Dark blue
                },
            }
        },
    },
    plugins: [],
};
