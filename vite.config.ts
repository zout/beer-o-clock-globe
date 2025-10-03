import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for GitHub Pages project sites. Override by setting GHP_BASE, e.g. "/where4oclock/"
  base: process.env.GHP_BASE || '/',
})
