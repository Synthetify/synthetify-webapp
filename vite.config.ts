import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

export default defineConfig({
  plugins: [
    react(),
    ViteAliases({
      adjustDuplicates: true,
      depth: 4
    })
  ],
  build: {
    target: 'es2020',
    rollupOptions: {
      plugins: [rollupNodePolyFill()]
    }
  },
  define: {
    'process.env.NODE_DEBUG': 'false'
  }
})
