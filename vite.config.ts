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
  build: {
    // three.js ships as one 740 kB module (188 kB gzipped); it is lazy-loaded with the garage.
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        // The 3D garage loads on demand; its libraries get their own long-lived chunks.
        codeSplitting: {
          // Only the matched packages, not everything they import (Vue stays in the main chunk).
          includeDependenciesRecursively: false,
          groups: [
            { name: "three", test: /node_modules[\\/]three[\\/]/ },
            {
              name: "postfx",
              test: /node_modules[\\/](postprocessing|@tresjs[\\/]post-processing)[\\/]/,
            },
            { name: "tres", test: /node_modules[\\/]@tresjs[\\/]/ },
            { name: "gsap", test: /node_modules[\\/]gsap[\\/]/ },
          ],
        },
      },
    },
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
