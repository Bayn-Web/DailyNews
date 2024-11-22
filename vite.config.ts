import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }, 
  server: {
    https: false,
    // 是否自动在浏览器打开
    open: true,
    cors: true,
    proxy: {
      '/dailynews': {
        target: 'https://tophub.today',    // 接口域名,接口服务器地止
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dailynews/, '')
      },
    }
  }
});
