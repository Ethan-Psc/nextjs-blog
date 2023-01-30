module.exports = {
  content: [
    // Use *.tsx if using TypeScript
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./components/**/*.js",
    "./components/**/*.ts",
  ],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
