
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to the backend server during local development
    // This resolves CORS issues and "Network Error" when running locally
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Use 127.0.0.1 to avoid localhost IPv4/IPv6 ambiguity
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
