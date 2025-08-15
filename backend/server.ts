import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import { Server } from "socket.io";
import fs from "fs";
import cookieParser from "cookie-parser";
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

const allowedOrigins = [
  "https://localhost:5173",
  "https://localhost:5174",
  "https://127.0.0.1:5173",
  "https://127.0.0.1:5174",
];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        console.log("Allowed origin:", origin);
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());

const sslOptions = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem"),
};

// Create the HTTPS server
const httpsServer = https.createServer(sslOptions, app);

// Initialize Socket.IO
const io = new Server(httpsServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export { app, pool, httpsServer, io };
