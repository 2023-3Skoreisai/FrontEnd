import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
      '@/': `${pathSrc}/`,
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
})
