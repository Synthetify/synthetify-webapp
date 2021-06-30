import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'

export default defineConfig({
  plugins: [
    ViteAliases({
      adjustDuplicates: true,
      depth: 4
    })
  ],
  define : {
    'process.env.NODE_DEBUG' : 'false',
  },
})
