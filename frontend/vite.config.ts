import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

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
});
