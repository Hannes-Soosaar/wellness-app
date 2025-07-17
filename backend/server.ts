import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
dotenv.config({ path: "" });

const { Pool } = pg;
const app = express();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

//TODO change the origin, once deployed deploy on v3.0
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://localhost:5173",
      "https://localhost:5174",
      "https://127.0.0.1:5174",
      "https://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const sslOptions = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem"),
};

// Create the HTTPS server
const httpsServer = https.createServer(sslOptions, app);

export { app, pool, httpsServer };
