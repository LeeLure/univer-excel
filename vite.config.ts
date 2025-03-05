import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

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

    // 配置 src 为 @
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },


    plugins: [vue()],
  }
})
