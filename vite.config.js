import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    {
      handleHotUpdate({ file, server }) {
        if (
          file.endsWith('.php') ||
          file.endsWith('.js') ||
          file.endsWith('.vue') ||
          file.endsWith('.css')
        ) {
          server.ws.send({ type: 'full-reload', path: '*' })
        }
      },
    },
  ],
  publicDir: resolve(__dirname + '/src/assets'),
  build: {
    manifest: true,
    chunkSizeWarningLimit: 1000,
    outDir: resolve(__dirname + '/assets'),
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(__dirname + '/src/js/main.js'),
        resolve(__dirname + '/src/vue/app.js'),
        resolve(__dirname + '/src/css/style.css'),
      ],
      output: {
        chunkFileNames: 'js/modules/[name]-[hash].js',
        entryFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'images/[name][extname]'
          }

          if (/\.(eot|woff2|woff|ttf)$/.test(name ?? '')) {
            return 'fonts/[name][extname]'
          }

          if (/\.css$/.test(name ?? '')) {
            return 'css/[name][extname]'
          }

          return 'other/[name]-[hash][extname]'
        },
      },
    },
  },
  server: {
    cors: {
      origin: '*',
    },
    port: 5173,
    proxy: {
      '/wp-json': {
        target: process.env.VITE_WP_URL,
        changeOrigin: true,
      },
    },
    hmr: {
      host: 'localhost',
    },
  },
})
