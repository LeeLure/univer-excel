import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import packageJson from './package.json'

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      proxy: {
        '/universer-api': {
          target: env.VITE_APP_UNIVER_ENDPOINT + env.VITE_APP_UNIVER_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/universer-api/, ''),
          ws: true
        }
      }
    },

    define: {
      'process.env.UNIVER_CLIENT_LICENSE': `"${env.VITE_APP_UNIVER_LICENSE}"`,
      'process.env.UNIVER_VERSION': `"${packageJson.dependencies['@univerjs/presets']}"`,
    },

    // 配置 src 为 @
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },

    worker: {
      rollupOptions: {
        output: {
          entryFileNames: 'worker.js',
        },
      },
    },


    plugins: [
      vue(),
      Components({
        dts: './types/components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: ['vue', 'pinia'],
        dirs: ['src/store', 'src/hooks'],
        dts: './types/auto-imports.d.ts',

        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      })
    ]
  }
})
