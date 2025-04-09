

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {Pool} = require('pg');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const app = express();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
})
);

app.get('/api/login', (req: any, res: any) => {
    console.log('Login endpoint hit');
    res.json({ message: 'Hello from the backend!' });
});

app.get('/api/db-test', async (req: any, res: any) => {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected successfully', time: result.rows[0].now });
  });

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});


