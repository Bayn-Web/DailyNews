// vite.config.ts
import { defineConfig } from "file:///D:/DeskTop/react/reactGame/node_modules/.pnpm/vite@4.5.5_@types+node@22.9.1/node_modules/vite/dist/node/index.js";
import react from "file:///D:/DeskTop/react/reactGame/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@4.5.5_@types+node@22.9.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\DeskTop\\react\\reactGame";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    https: false,
    // 是否自动在浏览器打开
    open: true,
    cors: true,
    proxy: {
      "/dailynews": {
        target: "https://tophub.today",
        // 接口域名,接口服务器地止
        changeOrigin: true,
        secure: false,
        rewrite: (path2) => path2.replace(/^\/dailynews/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXNrVG9wXFxcXHJlYWN0XFxcXHJlYWN0R2FtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRGVza1RvcFxcXFxyZWFjdFxcXFxyZWFjdEdhbWVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0Rlc2tUb3AvcmVhY3QvcmVhY3RHYW1lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LCBcbiAgc2VydmVyOiB7XG4gICAgaHR0cHM6IGZhbHNlLFxuICAgIC8vIFx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NjI1M1x1NUYwMFxuICAgIG9wZW46IHRydWUsXG4gICAgY29yczogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgJy9kYWlseW5ld3MnOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vdG9waHViLnRvZGF5JywgICAgLy8gXHU2M0E1XHU1M0UzXHU1N0RGXHU1NDBELFx1NjNBNVx1NTNFM1x1NjcwRFx1NTJBMVx1NTY2OFx1NTczMFx1NkI2MlxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9kYWlseW5ld3MvLCAnJylcbiAgICAgIH0sXG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1EsU0FBUyxvQkFBb0I7QUFDclMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBO0FBQUEsSUFFUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxjQUFjO0FBQUEsUUFDWixRQUFRO0FBQUE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLGdCQUFnQixFQUFFO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
