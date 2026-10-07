import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site under /<repo-name>/. The deploy workflow
// sets BASE_PATH to that; locally the site runs at the root.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
