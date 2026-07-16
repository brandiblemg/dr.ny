/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        base: "#F7F6F2",
        "base-alt": "#F2F0EB",
        "deep-teal": "#1F3E5A",
        "teal-hover": "#163149",
        "accent-sand": "#E5E2DA",
        "sand-light": "#F0ECE4",
        "accent-sage": "#7E9C8C",
        "sage-light": "#9EB4A5",
        "warm-sand": "#FFFFFF",
        "text-primary": "#2A2A2A",
        "text-secondary": "#515151",
        "text-muted": "#666666",
        divider: "#E5E0D8",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
