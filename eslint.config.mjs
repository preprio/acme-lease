import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
    {
        ignores: [
            '.next/**',
            'node_modules/**',
            'out/**',
            'dist/**',
            'build/**',
            '.cache/**',
            'public/**',
            '*.config.js',
            '*.config.mjs',
            'src/gql/**',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            // Disable base rule
            'no-unused-vars': 'off',

            // TypeScript rules
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',

            // General rules
            'prefer-const': 'error',

            // React rules
            'react/react-in-jsx-scope': 'off', // Not needed in Next.js
            'react/prop-types': 'off', // Using TypeScript
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
