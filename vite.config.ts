import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    // Don't use jsnext:main (react-redux-toastr's points to uncompiled JSX source)
    mainFields: ['module', 'main'],
  },
});
