import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  server: {
    port: '3000',
    strictPort: true
  },
  root: resolve(__dirname, 'src/'),
  build: {
    port: '3000',
    strictPort: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    },
    outDir: resolve(__dirname, 'dist/')
  },
  plugins: [
    checker({
      typescript: false
    })
  ]
});
