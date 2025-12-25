import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // MANDATORY: Docker maps port 3000
    host: true,       // Listen on all addresses (0.0.0.0)
    strictPort: true, // Fail if port 3000 is taken
    watch: {
      usePolling: true // Needed for Docker on Windows
    }
  }
})