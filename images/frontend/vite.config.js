import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      // Enable HMR for React components
      overlay: true, // Show a full-screen overlay in the browser when there are compiler errors or warnings
    },
  },
})
