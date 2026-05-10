import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'motion':        ['framer-motion'],
          'three-vendor':  ['three', '@react-three/fiber', '@react-three/drei'],
          'spline':        ['@splinetool/react-spline', '@splinetool/runtime'],
          'icons':         ['lucide-react'],
          'anime':         ['animejs'],
        },
      },
    },
  },
})
