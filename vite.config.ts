import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { templateCompilerOptions } from "@tresjs/core";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/; the deploy workflow passes it in.
  base: process.env.BASE_PATH ?? "/",
  // TresJS: let Vue treat <Tres*> tags as Three.js objects, not unknown components.
  plugins: [vue({ ...templateCompilerOptions }), tailwindcss(), imagetools()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
