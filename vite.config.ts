/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/batuu-scanner2/",
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
