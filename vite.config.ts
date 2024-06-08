import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
  base: "./",
  test: {
    environment: "jsdom",
    provider: "v8",
    coverage: {
      reporter: ["lcov", "text"],
    },
  },
});
