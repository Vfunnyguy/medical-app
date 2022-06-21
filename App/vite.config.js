import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path=require('path')
// https://vitejs.dev/config/
export default defineConfig({
   resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src/utils'),
      '~' : path.resolve(__dirname, './src/pages'),
      '#' : path.resolve(__dirname, './src/components')
    },
  },
  server:{
    proxy: {
      '/api': {
           target: 'https://localhost:3920',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
  }
  },

  plugins: [react()]
})
