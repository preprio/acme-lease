import type { Config } from 'tailwindcss'
// @ts-ignore
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette'

export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            animation: {
                scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
            },
            keyframes: {
                scroll: {
                    to: {
                        transform: 'translate(calc(-50% - 0.5rem))',
                    },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            aspectRatio: {
                '20/17': '20 / 17',
            },
            colors: {
                gray: {
                    50: '#EEEEEE',
                    100: '#D9D9D9',
                },
                neutral: {
                    50: '#F1F4F8',
                    100: '#CBD5E1',
                    200: '#A4B7CD',
                    700: '#334155',
                },
                primary: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#bfdbfe',
                    600: '#2563EB',
                    700: '#1D4ED8',
                },
                secondary: {
                    100: '#F1F5F9',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                },
            },
            fontSize: {
                'mb-base': ['0.875rem', '1.375rem'],
                'mb-lg': ['1rem', '1.5rem'],
                'mb-2xl': ['1.375rem', '1.75rem'],
                'mb-3xl': ['1.75rem', '2.25rem'],
                'mb-4xl': '2rem',
                'mb-5xl': '2.675rem',
            },
            maxWidth: {
                prose: '50rem',
            },
            spacing: {
                18: '4.5rem',
                136: '34rem',
                '8xl': '90rem',
                '4.5': '1.125rem',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), addVariablesForColors],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme('colors'))
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    )

    addBase({
        ':root': newVars,
    })
}
