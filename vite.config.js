import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative base so GitHub project Pages works at /<repo>/
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        themes: resolve(__dirname, "themes.html"),
        how: resolve(__dirname, "how-it-works.html"),
        join: resolve(__dirname, "join.html"),
        about: resolve(__dirname, "about.html"),
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
