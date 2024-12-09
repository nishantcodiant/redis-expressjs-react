import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: '0.0.0.0', // Allows the server to be accessed externally
    // port: 5173,      // You can specify a port or use the default
    proxy: {
      '/api': {
        target: 'https://redis-expressjs-react.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
