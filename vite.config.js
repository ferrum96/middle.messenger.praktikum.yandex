import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  server: {
    port: '3000',
    strictPort: true
  },
  emptyOutDir: false,
  root: resolve(__dirname, 'src/'),
  build: {
    port: '3000',
    strictPort: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    },
    outDir: resolve(__dirname, 'dist/'),
    emptyOutDir: true
  },
  plugins: [
    checker({
      typescript: true
    }),
    viteStaticCopy({
      targets: [{ src: 'assets/icons/**/*', dest: 'assets/icons/' }]
    })
  ]
});
