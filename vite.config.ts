import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    ...(mode !== "tailwind" ? [stylex.vite()] : []),
    ...(mode !== "stylex" ? [tailwindcss()] : []),
    react(),
  ],
  build: {
    outDir:
      mode === "stylex" || mode === "tailwind" ? `dist/bench/${mode}` : "dist",
    rollupOptions: {
      input:
        mode === "stylex" || mode === "tailwind"
          ? `bench-${mode}.html`
          : "index.html",
    },
  },
}));
