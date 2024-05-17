import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'date-fns': 'date-fns/esm',
    },
  },
  optimizeDeps: {
    include: ['date-fns/esm'],
  },
});
