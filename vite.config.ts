/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
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
});
