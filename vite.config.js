import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), AutoImport({ dts: true })],
});
