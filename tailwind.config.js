/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-', // add tw- before every class e.g., tw-bg-blue-500
  content: [
    "./src/**/*.{html,ts,css}", // scan your Angular components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
