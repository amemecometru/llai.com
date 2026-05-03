/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Anthropic brand-guidelines mapping
        display: ['Poppins', 'Arial', 'system-ui', 'sans-serif'],
        body: ['Lora', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // LogicLemon brand on Anthropic-inspired neutrals
        cream: '#FAF7F0',
        'cream-deep': '#F2EDE0',
        ink: '#1C1916',
        'ink-soft': '#4A453E',
        slate: '#6B6256',
        border: '#E8E2D5',
        lemon: {
          DEFAULT: '#F5C518',
          soft: '#FFF4CC',
          deep: '#B8920B',
        },
        // Dark mode tokens
        'dark-bg': '#0F0D0A',
        'dark-bg-2': '#181410',
        'dark-bg-3': '#221E18',
        'dark-ink': '#EDE8DA',
        'dark-ink-soft': '#B8B0A0',
        'dark-border': '#2D2823',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
      maxWidth: {
        prose: '68ch',
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
