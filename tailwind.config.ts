// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Dark mode theo hệ thống (prefers-color-scheme)
  darkMode: "media",
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages-ui/**/*.{js,ts,jsx,tsx,mdx}", // ✅ thêm
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
],

  theme: {
    extend: {
      maxWidth: {
        shell: "1470px",   // lớp ngoài
        content: "1024px", // lớp content bên trong
      },
      height: {
        header: "44px", // chiều cao header Apple
      },
    },
  },
  plugins: [],
};

export default config;
