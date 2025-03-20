import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    assetsInlineLimit: 0, // Ensures fonts are not inlined as Base64
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]' // Keeps assets organized
      }
    }
  },
  server: {
    watch: {
      usePolling: true, // Fixes issues with file watching
    }
  }
})
