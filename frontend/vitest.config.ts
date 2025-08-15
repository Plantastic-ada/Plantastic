import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './tests/setupTests.ts',
    //exclude: , // Example: Exclude e2e tests
    coverage: {
      provider: 'v8', // Use Vite's default coverage provider
      reporter: ['text', 'json', 'html']
    }
  }
})