import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 端口固定下来，8 个关卡可以同时开着互相对比
export default defineConfig({
  plugins: [vue()],
  server: { port: 5172 },
})
