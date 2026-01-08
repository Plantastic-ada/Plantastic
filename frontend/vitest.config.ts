import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/tests/setup/setupTests.ts",
    testTimeout: 10000,
    //exclude: , // Example: Exclude e2e tests
    coverage: {
      provider: "v8", // Use Vite's default coverage provider
      reporter: ["text", "json", "html"],
    },
    alias: {
      "@/assets": "/src/assets",
    },
  },
});
