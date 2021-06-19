import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'

export default defineConfig({
  plugins: [
    ViteAliases({
      find: '@containers',
      replacement: '${your_project_path}/src/containers',
      depth: 2,
      adjustDuplicates: true
    })
  ],
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      http: 'http-browserify',
      'node-fetch': 'isomorphic-fetch'
    }
  }
})
