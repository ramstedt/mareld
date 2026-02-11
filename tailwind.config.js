/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './stories/**/*.{js,ts,jsx,tsx,mdx}',

    // Relume UI components
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('@relume_io/relume-tailwind')],
  theme: {
    extend: {
      colors: {
        black: 'rgb(var(--ink-rgb) / <alpha-value>)',
        white: 'rgb(var(--bone-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        'warm-charcoal': 'rgb(var(--warm-charcoal-rgb) / <alpha-value>)',
        bone: 'rgb(var(--bone-rgb) / <alpha-value>)',
        'dusty-rose-clay': 'rgb(var(--dusty-rose-clay-rgb) / <alpha-value>)',
        sage: 'rgb(var(--sage-rgb) / <alpha-value>)',
        'mareld-blue': 'rgb(var(--mareld-blue-rgb) / <alpha-value>)',
        background: {
          DEFAULT: 'rgb(var(--bone-rgb) / <alpha-value>)',
          primary: 'rgb(var(--bone-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--dusty-rose-clay-rgb) / <alpha-value>)',
          alternative: 'rgb(var(--mareld-blue-rgb) / <alpha-value>)',
          success: 'rgb(var(--sage-rgb) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--ink-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--warm-charcoal-rgb) / <alpha-value>)',
          alternative: 'rgb(var(--ink-rgb) / <alpha-value>)',
          success: 'rgb(var(--warm-charcoal-rgb) / <alpha-value>)',
        },
        border: {
          primary: 'rgb(var(--ink-rgb) / 20%)',
          alternative: 'rgb(var(--warm-charcoal-rgb) / 20%)',
        },
        neutral: {
          white: 'rgb(var(--bone-rgb) / <alpha-value>)',
          light: 'rgb(var(--sage-rgb) / 30%)',
          dark: 'rgb(var(--warm-charcoal-rgb) / <alpha-value>)',
        },
      },
    },
  },
};

module.exports = config;
