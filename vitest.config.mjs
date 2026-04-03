import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{js,mjs}'],
    testTimeout: 30000,
    globalSetup: './tests/global-setup.mjs'
  }
})
