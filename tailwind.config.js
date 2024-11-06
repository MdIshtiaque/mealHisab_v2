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
                success: {
                    light: '#34D399',
                    DEFAULT: '#10B981',
                },
                warning: {
                    light: '#FBBF24',
                    DEFAULT: '#F59E0B',
                },
                danger: {
                    light: '#F87171',
                    DEFAULT: '#EF4444',
                },
                purple: {
                    light: '#A78BFA',
                    DEFAULT: '#8B5CF6',
                }
            },
            boxShadow: {
                'soft-xl': '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
            }
        },
    },
    safelist: [
        {
            pattern: /(bg|text|border)-(primary|secondary|success|warning|danger|purple)/,
            variants: ['hover', 'focus', 'active'],
        },
        {
            pattern: /(from|to)-(primary|secondary|success|warning|danger|purple)(-light)?/,
        },
    ],
    plugins: [],
};
