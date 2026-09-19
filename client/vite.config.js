import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Cloudflare serves this app from the domain root. GitHub Pages project sites
  // need /<repository-name>/, which the GitHub workflow selects explicitly.
  base: process.env.DEPLOY_TARGET === 'github-pages' ? '/cfdemo/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
})
