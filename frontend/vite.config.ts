import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
// import path from "path";
// import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    https: {
      key: fs.readFileSync("../backend/certs/key.pem"),
      cert: fs.readFileSync("../backend/certs/cert.pem"),
    },
    host: "localhost",
    port: 5173,
    fs: {
      allow: [".."],
    },
  },
  optimizeDeps: {
    include: ["@shared"],
  },
  // resolve: {
  //   // alias: {
  //   //   // "@shared": path.resolve(__dirname, "../shared/src/type"),
  //   //   // "@frontend": path.resolve(__dirname, "./"),
  //   // },
  // },
});
