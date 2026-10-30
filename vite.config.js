import { defineConfig } from 'vite'

// Relative asset paths keep the build deployable on both a GitHub Pages
// project site (username.github.io/repository/) and a custom domain.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
