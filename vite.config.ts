import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/; the deploy workflow passes it in.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss(), imagetools()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
