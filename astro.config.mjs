import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    server: {
      allowedHosts: [
        'sims-rapids-monthly-fibre.trycloudflare.com'
      ]
    }
  }
});
