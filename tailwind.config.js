/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EFE4",
        sand: "#EBE3D2",
        bone: "#FAF6EE",
        matcha: "#A8B89F",
        sage: "#6B7F5C",
        deepSage: "#4A5B3F",
        sky: "#B8CDD9",
        navy: "#1B2A4A",
        ink: "#2A2A28",
        coral: "#E8946B",
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
