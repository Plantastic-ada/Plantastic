import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/tests/setup/setupTests.ts",
    testTimeout: process.env.CI ? 15000 : 10000,
    retry: process.env.CI ? 2 : 0,
    reporters: process.env.CI
      ? ["json", "default"] // minimal mode in CI
      : ["verbose"],
    //exclude: , // Example: Exclude e2e tests
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    coverage: {
      provider: "v8", // Use Vite's default coverage provider
      reporter: ["text", "json", "html"],
    },
    alias: {
      "@/assets": "/src/assets",
    },
  },
});
