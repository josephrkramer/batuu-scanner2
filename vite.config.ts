/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  optimizeDeps: {
    exclude: ["three", "mind-ar", "three/addons/loaders/GLTFLoader.js"],
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["lcov", "text"],
    },
    setupFiles: "./test/setupTests.ts",
    watchExclude: [
      ...configDefaults.exclude,
      "**/scratch/**",
      //'./scratch/**'
    ],
  },
  build: {
    rollupOptions: {
      external: [
        "three",
        "three/addons/loaders/GLTFLoader.js",
        "mind-ar/mindar-image-three.prod.js",
      ],
    },
  },
});
