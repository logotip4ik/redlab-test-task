import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      dirs: ['./src/hooks', './src/composables'],
      imports: ['vue'],
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: false,
      directoryAsNamespace: true,
      globalNamespaces: [],
      directives: true,
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
    }),
  ],
});
