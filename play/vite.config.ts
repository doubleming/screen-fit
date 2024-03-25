import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
   alias: [
    {
      find: /@double_ming\/screen-fit-vue/,
      replacement: path.resolve(__dirname, '../packages/screen-fit-vue/src/index.ts')
    }
   ]
  }
})
