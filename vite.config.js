// eslint-disable-next-line no-undef
const file = require("./src/assets/offlineData.json");
import { fileURLToPath, URL } from "node:url";
import path from "path";
import process from "node:process";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// eslint-disable-next-line no-undef
const pathSrc = path.resolve(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  publicPath: process.env.BASE_URL,
  productionSourceMap: process.env.NODE_ENV !== "production",
  outputDir: process.env.OUTPUT_DIR,
  lintOnSave: true,

  configureWebpack: {
    devtool: process.env.NODE_ENV !== "production" ? "eval-source-map" : false,
  },

  css: {
    preprocessorOptions: {
      // eslint-disable-next-line prettier/prettier
      scss: { additionalData: `@import "${pathSrc}/assets/styles/_global.scss";` },
    },
  },

  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "https://127.0.0.1:8000/",
      },
    },

    before: (app) => {
      if (process.env.NODE_ENV !== "offline") {
        return;
      }

      // == GET ==
      app.get("/api/*", (req, res) => {
        res.json(file[`GET ${req.path}`]);
      });

      // == POST ==
      app.post("/api/*", (req, res) => {
        res.json(file[`POST ${req.path}`] || true);
      });

      // == PUT ==
      app.put("/api/*", (req, res) => {
        res.json(file[`PUT ${req.path}`] || true);
      });

      // == DELETE ==
      app.delete("/api/*", (req, res) => {
        res.json(file[`DELETE ${req.path}`] || true);
      });
    },
  },
});
