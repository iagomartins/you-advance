import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        content: resolve(__dirname, 'src/content-scripts/content.js'),
        sidebar: resolve(__dirname, 'src/content-scripts/sidebar.html')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'content' ? 'content.js' : chunkInfo.name === 'sidebar-main' ? 'sidebar-main.js' : '[name].js'
        }
      }
    }
  }
})
