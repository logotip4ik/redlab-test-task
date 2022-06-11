import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import SvgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: true,
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
    SvgLoader(),
    AutoImport({
      imports: ['vue'],
      dirs: ['./src/composables'],
      vueTemplate: true,
      sourceMap: false,
      dts: true,
    }),
  ],
});
