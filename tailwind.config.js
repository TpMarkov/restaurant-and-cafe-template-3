/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // New brand tokens for the redesigned template (distinct from original)
      colors: {
        "brand-ink": "#06283D",
        "brand-sand": "#F7F3EE",
        "brand-coral": "#FF6B6B",
        "brand-emerald": "#0E7B7B",
        "brand-muted": "#64748B",
        "brand-cream": "#FFF8F2",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Sora", "Arial", "sans-serif"],
      },
      // Keep a small set of custom utilities; animations will be driven primarily by GSAP
      boxShadow: {
        "soft-lg": "0 10px 30px rgba(6,40,61,0.08)",
      },
    },
  },
  plugins: [],
};
