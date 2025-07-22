import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("../backend/certs/key.pem"),
      cert: fs.readFileSync("../backend/certs/cert.pem"),
    },
    host: "localhost",
    port: 5173,
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
      "@frontend": path.resolve(__dirname, "./"),
    },
  },
});
