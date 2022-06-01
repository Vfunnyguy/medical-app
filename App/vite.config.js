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
  plugins: [react()]
})