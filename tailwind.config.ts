import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        sans: [
          "Nimbus Sans",
          "-apple-system",
          "Helvetica",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
    colors: {
      primary: "var(--color1, #e06c75)",
      background: "var(--background, #1e222a)",
      foreground: {
        primary: "#f8f8f2",
        secondary: "var(--color7, #44475a)",
      },
    }
  },
  plugins: [],
} satisfies Config;
