import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import pugPlugin from 'vite-plugin-pug';

export default defineConfig({
  plugins: [
    angular(),
    pugPlugin({})
  ]
});
