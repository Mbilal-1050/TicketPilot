/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — "control tower" palette.
        // Named for the aviation-instrument feel behind the TicketPilot brand,
        // used sparingly (not literal plane/cloud iconography).
        runway: {
          DEFAULT: "#12141C", // near-black ink, base dark surface
          50: "#F5F6F8",
          100: "#E7E9EE",
          200: "#C7CBD6",
          300: "#9BA1B0",
          400: "#6B7180",
          500: "#4A4F5C",
          600: "#333741",
          700: "#22242C",
          800: "#181A21",
          900: "#12141C",
        },
        cloud: "#F7F8FA", // light background
        steel: "#5B6472", // secondary text / borders
        beacon: {
          DEFAULT: "#2B5FF6", // primary accent — signal/beacon blue
          50: "#EBF0FE",
          100: "#D6E1FD",
          400: "#5580F8",
          500: "#2B5FF6",
          600: "#1E48D6",
          700: "#1836A8",
        },
        ember: {
          DEFAULT: "#E85D3F", // escalation / urgent accent
          50: "#FDEEEA",
          100: "#FBDCD3",
          500: "#E85D3F",
          600: "#C7472B",
        },
        cleared: {
          DEFAULT: "#1FAE7A", // auto-resolved / success accent
          50: "#E7F8F1",
          100: "#C8EFDD",
          500: "#1FAE7A",
          600: "#178F63",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18, 20, 28, 0.06), 0 1px 8px rgba(18, 20, 28, 0.04)",
      },
    },
  },
  plugins: [],
};
