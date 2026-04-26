import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1080px",
        "2xl": "1080px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: {
          DEFAULT: "#001d29",
          50: "#f4f6f7",
          100: "#e6eaec",
          200: "#bfc9cd",
          300: "#8a9ba2",
          400: "#566d76",
          500: "#23414c",
          600: "#001d29",
          700: "#001722",
          800: "#00121b",
          900: "#000d13",
        },
        azure: {
          DEFAULT: "#019bdc",
          50: "#e6f6fc",
          100: "#bfe7f6",
          200: "#80d0ee",
          300: "#40b8e7",
          400: "#1aa9e0",
          500: "#019bdc",
          600: "#0184bd",
          700: "#016c9b",
          800: "#015578",
          900: "#013d56",
        },
        accent: {
          DEFAULT: "#feda06",
          50: "#fffae0",
          100: "#fff3b3",
          200: "#feeb80",
          300: "#fee24d",
          400: "#fede26",
          500: "#feda06",
          600: "#d4b500",
          700: "#a88f00",
          800: "#7c6900",
          900: "#504300",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-plex)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.025em",
        tight: "-0.018em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0, 29, 41, 0.04), 0 8px 24px rgba(0, 29, 41, 0.04)",
        card: "0 1px 2px rgba(0, 29, 41, 0.04), 0 12px 40px rgba(0, 29, 41, 0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
