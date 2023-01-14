import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: "./index.html",
        "service-worker": "./sw.js",
      },
      output: {
        entryFileNames: (assetInfo) =>
          assetInfo.name === "sw" ? "[name].js" : "assets/js/[name]-[hash].js",
      },
    },
  },
});
