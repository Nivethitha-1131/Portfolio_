/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        surface:    'var(--surface)',
        card:       'var(--card)',
        burgundy:   'var(--primary)',
        gold:       'var(--gold)',
        cream:      'var(--text)',
        slate:      'var(--muted)',
        hairline:   'var(--border)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
      animation: {
        shimmer: 'shimmer 5s linear infinite',
        grain:   'grain 8s steps(10) infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':  { transform: 'translate(-2%, -3%)' },
          '20%':  { transform: 'translate(3%, 1%)' },
          '30%':  { transform: 'translate(-1%, 4%)' },
          '40%':  { transform: 'translate(2%, -2%)' },
          '50%':  { transform: 'translate(-3%, 2%)' },
          '60%':  { transform: 'translate(1%, -4%)' },
          '70%':  { transform: 'translate(4%, 3%)' },
          '80%':  { transform: 'translate(-2%, 1%)' },
          '90%':  { transform: 'translate(3%, -1%)' },
        },
      },
      transitionTimingFunction: {
        'ease-editorial': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
};
